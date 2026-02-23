import { FrameBufferRenderable, RGBA, type BoxRenderable } from "@opentui/core"
import { useRenderer } from "@opentui/solid"
import { onCleanup, onMount } from "solid-js"
import { GifReader } from "omggif"
import path from "path"

export function GifRenderer(props: { path: string; width?: number; height?: number }) {
  const renderer = useRenderer()
  let fb: FrameBufferRenderable | null = null
  let timeout: ReturnType<typeof setTimeout> | null = null
  let aborted = false
  let parent: BoxRenderable | undefined

  const draw = (target: FrameBufferRenderable, rgba: Uint8Array, w: number, h: number) => {
    const buf = target.frameBuffer
    const targetW = buf.width
    // Half-block rendering: each cell = 2 vertical pixels
    const scaleX = w / targetW
    const scaleY = h / (buf.height * 2)

    buf.clear(RGBA.fromValues(0, 0, 0, 0))

    for (let row = 0; row < buf.height; row++) {
      for (let x = 0; x < targetW; x++) {
        const srcX = Math.floor(x * scaleX)

        // Top pixel
        const topIdx = (Math.floor(row * 2 * scaleY) * w + srcX) * 4
        const tr = rgba[topIdx]
        const tg = rgba[topIdx + 1]
        const tb = rgba[topIdx + 2]
        const ta = rgba[topIdx + 3]

        // Bottom pixel
        const botIdx = (Math.min(Math.floor((row * 2 + 1) * scaleY), h - 1) * w + srcX) * 4
        const br = rgba[botIdx]
        const bg = rgba[botIdx + 1]
        const bb = rgba[botIdx + 2]
        const ba = rgba[botIdx + 3]

        if (ta < 32 && ba < 32) continue

        // ▀ = top half block: fg = top pixel, bg = bottom pixel
        buf.setCell(
          x,
          row,
          "▀",
          RGBA.fromValues(tr / 255, tg / 255, tb / 255, ta / 255),
          RGBA.fromValues(br / 255, bg / 255, bb / 255, ba / 255),
        )
      }
    }
  }

  onMount(async () => {
    const source = props.path.startsWith("file://") ? new URL(props.path) : path.resolve(import.meta.dirname, props.path)
    const file = Bun.file(source)
    if (!(await file.exists())) return
    if (aborted) return

    const gif = new GifReader(new Uint8Array(await file.arrayBuffer()))
    if (aborted) return

    const count = gif.numFrames()
    if (count === 0) return

    const targetW = props.width ?? Math.min(Math.floor(gif.width / 2), 40)
    const targetH = props.height ?? Math.min(Math.floor(gif.height / 4), 20)

    fb = new FrameBufferRenderable(renderer, {
      id: "gif-renderer",
      width: targetW,
      height: targetH,
      position: "relative",
      live: count > 1,
    })

    if (parent) parent.add(fb)

    // Pre-composite all frames into full-canvas RGBA buffers
    const canvas = new Uint8Array(gif.width * gif.height * 4)
    const backup = new Uint8Array(gif.width * gif.height * 4)
    const composited: Uint8Array[] = []
    const delays: number[] = []

    for (let i = 0; i < count; i++) {
      const info = gif.frameInfo(i)
      delays.push(Math.max((info.delay || 10) * 10, 20))

      if (info.disposal === 3) backup.set(canvas)

      gif.decodeAndBlitFrameRGBA(i, canvas)
      composited.push(new Uint8Array(canvas))

      // Handle disposal
      switch (info.disposal) {
        case 2:
          // Restore to background
          for (let y = info.y; y < info.y + info.height; y++) {
            for (let x = info.x; x < info.x + info.width; x++) {
              const idx = (y * gif.width + x) * 4
              canvas[idx] = 0
              canvas[idx + 1] = 0
              canvas[idx + 2] = 0
              canvas[idx + 3] = 0
            }
          }
          break
        case 3:
          canvas.set(backup)
          break
      }
    }

    draw(fb, composited[0], gif.width, gif.height)
    fb.requestRender()

    if (count > 1) {
      let frame = 0
      const step = () => {
        if (aborted) return
        frame = (frame + 1) % count
        if (fb) {
          draw(fb, composited[frame], gif.width, gif.height)
          fb.requestRender()
        }
        timeout = setTimeout(step, delays[frame])
      }
      timeout = setTimeout(step, delays[0])
    }
  })

  onCleanup(() => {
    aborted = true
    if (timeout) clearTimeout(timeout)
    if (fb && parent) {
      parent.remove(fb.id)
      fb = null
    }
  })

  return <box ref={(r) => (parent = r)} width={props.width} height={props.height} />
}
