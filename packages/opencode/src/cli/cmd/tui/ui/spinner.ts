import type { ColorInput } from "@opentui/core"
import { RGBA } from "@opentui/core"
import type { ColorGenerator } from "opentui-spinner"

interface AdvancedGradientOptions {
  colors: ColorInput[]
  trailLength: number
  defaultColor?: ColorInput
  direction?: "forward" | "backward" | "bidirectional"
  holdFrames?: { start?: number; end?: number }
  enableFading?: boolean
  minAlpha?: number
}

interface ScannerState {
  activePosition: number
  isHolding: boolean
  holdProgress: number
  holdTotal: number
  movementProgress: number
  movementTotal: number
  isMovingForward: boolean
}

function getScannerState(
  frameIndex: number,
  totalChars: number,
  options: Pick<AdvancedGradientOptions, "direction" | "holdFrames">,
): ScannerState {
  const { direction = "forward", holdFrames = {} } = options

  if (direction === "bidirectional") {
    const forwardFrames = totalChars
    const holdEndFrames = holdFrames.end ?? 0
    const backwardFrames = totalChars - 1

    if (frameIndex < forwardFrames) {
      // Moving forward
      return {
        activePosition: frameIndex,
        isHolding: false,
        holdProgress: 0,
        holdTotal: 0,
        movementProgress: frameIndex,
        movementTotal: forwardFrames,
        isMovingForward: true,
      }
    } else if (frameIndex < forwardFrames + holdEndFrames) {
      // Holding at end
      return {
        activePosition: totalChars - 1,
        isHolding: true,
        holdProgress: frameIndex - forwardFrames,
        holdTotal: holdEndFrames,
        movementProgress: 0,
        movementTotal: 0,
        isMovingForward: true,
      }
    } else if (frameIndex < forwardFrames + holdEndFrames + backwardFrames) {
      // Moving backward
      const backwardIndex = frameIndex - forwardFrames - holdEndFrames
      return {
        activePosition: totalChars - 2 - backwardIndex,
        isHolding: false,
        holdProgress: 0,
        holdTotal: 0,
        movementProgress: backwardIndex,
        movementTotal: backwardFrames,
        isMovingForward: false,
      }
    } else {
      // Holding at start
      return {
        activePosition: 0,
        isHolding: true,
        holdProgress: frameIndex - forwardFrames - holdEndFrames - backwardFrames,
        holdTotal: holdFrames.start ?? 0,
        movementProgress: 0,
        movementTotal: 0,
        isMovingForward: false,
      }
    }
  } else if (direction === "backward") {
    return {
      activePosition: totalChars - 1 - (frameIndex % totalChars),
      isHolding: false,
      holdProgress: 0,
      holdTotal: 0,
      movementProgress: frameIndex % totalChars,
      movementTotal: totalChars,
      isMovingForward: false,
    }
  } else {
    return {
      activePosition: frameIndex % totalChars,
      isHolding: false,
      holdProgress: 0,
      holdTotal: 0,
      movementProgress: frameIndex % totalChars,
      movementTotal: totalChars,
      isMovingForward: true,
    }
  }
}

function calculateColorIndex(
  frameIndex: number,
  charIndex: number,
  totalChars: number,
  options: Pick<AdvancedGradientOptions, "direction" | "holdFrames" | "trailLength">,
  state?: ScannerState,
): number {
  const { trailLength } = options
  const { activePosition, isHolding, holdProgress, isMovingForward } =
    state ?? getScannerState(frameIndex, totalChars, options)

  // Calculate directional distance (positive means trailing behind)
  const directionalDistance = isMovingForward
    ? activePosition - charIndex // For forward: trail is to the left (lower indices)
    : charIndex - activePosition // For backward: trail is to the right (higher indices)

  // Handle hold frame fading: keep the lead bright, fade the trail
  if (isHolding) {
    // Shift the color index by how long we've been holding
    return directionalDistance + holdProgress
  }

  // Normal movement - show gradient trail only behind the movement direction
  if (directionalDistance > 0 && directionalDistance < trailLength) {
    return directionalDistance
  }

  // At the active position, show the brightest color
  if (directionalDistance === 0) {
    return 0
  }

  return -1
}

function createKnightRiderTrail(options: AdvancedGradientOptions): ColorGenerator {
  const { colors, defaultColor, enableFading = true, minAlpha = 0 } = options

  // Use the provided defaultColor if it's an RGBA instance, otherwise convert/default
  // We use RGBA.fromHex for the fallback to ensure we have an RGBA object.
  // Note: If defaultColor is a string, we convert it once here.
  const defaultRgba = defaultColor instanceof RGBA ? defaultColor : RGBA.fromHex((defaultColor as string) || "#000000")

  // Store the base alpha from the inactive factor
  const baseInactiveAlpha = defaultRgba.a

  let cachedFrameIndex = -1
  let cachedState: ScannerState | null = null

  return (frameIndex: number, charIndex: number, _totalFrames: number, totalChars: number) => {
    if (frameIndex !== cachedFrameIndex) {
      cachedFrameIndex = frameIndex
      cachedState = getScannerState(frameIndex, totalChars, options)
    }

    const state = cachedState!

    const index = calculateColorIndex(frameIndex, charIndex, totalChars, options, state)

    // Calculate global fade for inactive dots during hold or movement
    const { isHolding, holdProgress, holdTotal, movementProgress, movementTotal } = state

    let fadeFactor = 1.0
    if (enableFading) {
      if (isHolding && holdTotal > 0) {
        // Fade out linearly to minAlpha
        const progress = Math.min(holdProgress / holdTotal, 1)
        fadeFactor = Math.max(minAlpha, 1 - progress * (1 - minAlpha))
      } else if (!isHolding && movementTotal > 0) {
        // Fade in linearly from minAlpha during movement
        const progress = Math.min(movementProgress / Math.max(1, movementTotal - 1), 1)
        fadeFactor = minAlpha + progress * (1 - minAlpha)
      }
    }

    // Combine base inactive alpha with the fade factor
    // This ensures inactiveFactor is respected while still allowing fading animation
    defaultRgba.a = baseInactiveAlpha * fadeFactor

    if (index === -1) {
      return defaultRgba
    }

    return colors[index] ?? defaultRgba
  }
}

/**
 * Derives a gradient of tail colors from a single bright color using alpha falloff
 * @param brightColor The brightest color (center/head of the scanner)
 * @param steps Number of gradient steps (default: 6)
 * @returns Array of RGBA colors with alpha-based trail fade (background-independent)
 */
export function deriveTrailColors(brightColor: ColorInput, steps: number = 6): RGBA[] {
  const baseRgba = brightColor instanceof RGBA ? brightColor : RGBA.fromHex(brightColor as string)

  const colors: RGBA[] = []

  for (let i = 0; i < steps; i++) {
    // Alpha-based falloff with optional bloom effect
    let alpha: number
    let brightnessFactor: number

    if (i === 0) {
      // Lead position: full brightness and opacity
      alpha = 1.0
      brightnessFactor = 1.0
    } else if (i === 1) {
      // Slight bloom/glare effect: brighten color but reduce opacity slightly
      alpha = 0.9
      brightnessFactor = 1.15
    } else {
      // Exponential alpha decay for natural-looking trail fade
      alpha = Math.pow(0.65, i - 1)
      brightnessFactor = 1.0
    }

    const r = Math.min(1.0, baseRgba.r * brightnessFactor)
    const g = Math.min(1.0, baseRgba.g * brightnessFactor)
    const b = Math.min(1.0, baseRgba.b * brightnessFactor)

    colors.push(RGBA.fromValues(r, g, b, alpha))
  }

  return colors
}

/**
 * Derives the inactive/default color from a bright color using alpha
 * @param brightColor The brightest color (center/head of the scanner)
 * @param factor Alpha factor for inactive color (default: 0.2, range: 0-1)
 * @returns The same color with reduced alpha for background-independent dimming
 */
export function deriveInactiveColor(brightColor: ColorInput, factor: number = 0.2): RGBA {
  const baseRgba = brightColor instanceof RGBA ? brightColor : RGBA.fromHex(brightColor as string)

  // Use the full color brightness but adjust alpha for background-independent dimming
  return RGBA.fromValues(baseRgba.r, baseRgba.g, baseRgba.b, factor)
}

export type KnightRiderStyle = "blocks" | "diamonds"

export interface KnightRiderOptions {
  width?: number
  style?: KnightRiderStyle
  holdStart?: number
  holdEnd?: number
  colors?: ColorInput[]
  /** Single color to derive trail from (alternative to providing colors array) */
  color?: ColorInput
  /** Number of trail steps when using single color (default: 6) */
  trailSteps?: number
  defaultColor?: ColorInput
  /** Alpha factor for inactive color when using single color (default: 0.2, range: 0-1) */
  inactiveFactor?: number
  /** Enable fading of inactive dots during hold and movement (default: true) */
  enableFading?: boolean
  /** Minimum alpha value when fading (default: 0, range: 0-1) */
  minAlpha?: number
}

/**
 * Creates frame strings for a Knight Rider style scanner animation
 * @param options Configuration options for the Knight Rider effect
 * @returns Array of frame strings
 */
export function createFrames(options: KnightRiderOptions = {}): string[] {
  const width = options.width ?? 8
  const style = options.style ?? "diamonds"
  const holdStart = options.holdStart ?? 30
  const holdEnd = options.holdEnd ?? 9

  const colors =
    options.colors ??
    (options.color
      ? deriveTrailColors(options.color, options.trailSteps)
      : [
          RGBA.fromHex("#ff0000"), // Brightest Red (Center)
          RGBA.fromHex("#ff5555"), // Glare/Bloom
          RGBA.fromHex("#dd0000"), // Trail 1
          RGBA.fromHex("#aa0000"), // Trail 2
          RGBA.fromHex("#770000"), // Trail 3
          RGBA.fromHex("#440000"), // Trail 4
        ])

  const defaultColor =
    options.defaultColor ??
    (options.color ? deriveInactiveColor(options.color, options.inactiveFactor) : RGBA.fromHex("#330000"))

  const trailOptions = {
    colors,
    trailLength: colors.length,
    defaultColor,
    direction: "bidirectional" as const,
    holdFrames: { start: holdStart, end: holdEnd },
    enableFading: options.enableFading,
    minAlpha: options.minAlpha,
  }

  // Bidirectional cycle: Forward (width) + Hold End + Backward (width-1) + Hold Start
  const totalFrames = width + holdEnd + (width - 1) + holdStart

  // Generate dynamic frames where inactive pixels are dots and active ones are blocks
  const frames = Array.from({ length: totalFrames }, (_, frameIndex) => {
    return Array.from({ length: width }, (_, charIndex) => {
      const index = calculateColorIndex(frameIndex, charIndex, width, trailOptions)

      if (style === "diamonds") {
        const shapes = ["⬥", "◆", "⬩", "⬪"]
        if (index >= 0 && index < trailOptions.colors.length) {
          return shapes[Math.min(index, shapes.length - 1)]
        }
        return "·"
      }

      // Default to blocks - index 0 is brightest, higher indices are dimmer
      // Use visually distinct block shading characters
      const blocks = ["█", "▓", "▒", "░"]
      if (index >= 0 && index < trailOptions.colors.length) {
        // Direct mapping: each trail position gets its own block character
        return blocks[Math.min(index, blocks.length - 1)]
      }
      return "·"
    }).join("")
  })

  return frames
}

/**
 * Creates a color generator function for Knight Rider style scanner animation
 * @param options Configuration options for the Knight Rider effect
 * @returns ColorGenerator function
 */
export function createColors(options: KnightRiderOptions = {}): ColorGenerator {
  const holdStart = options.holdStart ?? 30
  const holdEnd = options.holdEnd ?? 9

  const colors =
    options.colors ??
    (options.color
      ? deriveTrailColors(options.color, options.trailSteps)
      : [
          RGBA.fromHex("#ff0000"), // Brightest Red (Center)
          RGBA.fromHex("#ff5555"), // Glare/Bloom
          RGBA.fromHex("#dd0000"), // Trail 1
          RGBA.fromHex("#aa0000"), // Trail 2
          RGBA.fromHex("#770000"), // Trail 3
          RGBA.fromHex("#440000"), // Trail 4
        ])

  const defaultColor =
    options.defaultColor ??
    (options.color ? deriveInactiveColor(options.color, options.inactiveFactor) : RGBA.fromHex("#330000"))

  const trailOptions = {
    colors,
    trailLength: colors.length,
    defaultColor,
    direction: "bidirectional" as const,
    holdFrames: { start: holdStart, end: holdEnd },
    enableFading: options.enableFading,
    minAlpha: options.minAlpha,
  }

  return createKnightRiderTrail(trailOptions)
}

export interface PulseOptions {
  width?: number            // Number of characters (default: 8)
  style?: KnightRiderStyle  // "blocks" or "diamonds" (default: "blocks")
  color?: ColorInput        // Base color to pulse
  riseFrames?: number       // Frames for brightness to rise (default: 5)
  fallFrames?: number       // Frames for brightness to fall (default: 5)
  gapFrames?: number        // Frames of darkness between pulses (default: 3)
  restFrames?: number       // Frames to rest at minimum (default: 10)
  pulseCount?: number       // Number of pulses before rest (default: 2)
  minAlpha?: number         // Darkest alpha (default: 0)
  maxAlpha?: number         // Brightest alpha (default: 1.0)
  spreadDelay?: number      // Frame delay per distance from center (default: 2)
}

/**
 * Quadratic ease-in-out function for smooth animations
 * @param t Progress value from 0 to 1
 * @returns Eased value from 0 to 1
 */
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

/**
 * Calculates alpha value for a center-outward pulsing animation
 * @param frame Current frame number (adjusted for character delay)
 * @param singlePulse Total frames in one pulse (rise + fall)
 * @param pulseCount Number of pulses before rest period
 * @param restFrames Number of frames to rest at minimum brightness
 * @param minAlpha Minimum alpha value
 * @param maxAlpha Maximum alpha value
 * @param riseFrames Number of frames for brightness to rise
 * @param fallFrames Number of frames for brightness to fall
 * @returns Alpha value for the current frame
 */
function calculateCenterPulseAlpha(
  frame: number,
  singlePulse: number,
  pulseCount: number,
  restFrames: number,
  minAlpha: number,
  maxAlpha: number,
  riseFrames: number,
  fallFrames: number,
): number {
  // If frame is negative (delayed character hasn't started yet), stay at min
  if (frame < 0) return minAlpha
  
  const pulsesEnd = singlePulse * pulseCount
  
  // During rest period
  if (frame >= pulsesEnd) return minAlpha
  
  // Determine which pulse we're in and position within that pulse
  const pulseIndex = Math.floor(frame / singlePulse)
  const frameInPulse = frame % singlePulse
  
  if (pulseIndex >= pulseCount) return minAlpha
  
  // Rising phase
  if (frameInPulse < riseFrames) {
    const progress = frameInPulse / riseFrames
    return minAlpha + (maxAlpha - minAlpha) * easeInOutQuad(progress)
  }
  
  // Falling phase
  const fallProgress = (frameInPulse - riseFrames) / fallFrames
  return maxAlpha - (maxAlpha - minAlpha) * easeInOutQuad(fallProgress)
}

/**
 * Calculates alpha for a breathing animation where a wave expands from center then contracts back
 * Think of it as a circular wave: the "radius" grows and shrinks, and each position's brightness
 * depends on how close the wave radius is to that position's distance from center
 * @param frame Current frame in the animation cycle
 * @param distance This character's distance from center
 * @param singlePulse Total frames in one pulse
 * @param pulseCount Number of pulses before rest
 * @param restFrames Frames to rest at minimum
 * @param minAlpha Minimum alpha value
 * @param maxAlpha Maximum alpha value  
 * @param riseFrames Frames for wave to expand outward
 * @param fallFrames Frames for wave to contract inward
 * @param totalChars Total number of characters
 * @returns Alpha value for this character at this frame
 */
function calculateSimpleBreathingAlpha(
  frame: number,
  distance: number,
  singlePulse: number,
  pulseCount: number,
  restFrames: number,
  minAlpha: number,
  maxAlpha: number,
  riseFrames: number,
  fallFrames: number,
  totalChars: number,
  gapFrames: number = 3,
): number {
  const pulseWithGap = singlePulse + gapFrames
  const allPulsesEnd = (pulseWithGap * pulseCount) - gapFrames // No gap after last pulse
  
  // During final rest period, everything is dark
  if (frame >= allPulsesEnd) return minAlpha
  
  // Determine which pulse we're in (accounting for gaps)
  const pulseIndex = Math.floor(frame / pulseWithGap)
  if (pulseIndex >= pulseCount) return minAlpha
  
  const frameInCycle = frame % pulseWithGap
  
  // If we're in the gap between pulses, stay dark
  if (frameInCycle >= singlePulse) return minAlpha
  
  const frameInPulse = frameInCycle
  
  // Calculate the "wave radius" - how far from center the wave has spread
  const maxDistance = ((totalChars - 1) / 2) + 1
  let waveRadius: number
  
  if (frameInPulse < riseFrames) {
    // Expanding phase: wave grows from 0 to maxDistance
    waveRadius = (frameInPulse / riseFrames) * maxDistance
  } else {
    // Contracting phase: wave shrinks from maxDistance back to 0
    const fallFrame = frameInPulse - riseFrames
    waveRadius = maxDistance - (fallFrame / fallFrames) * maxDistance
  }
  
  // A position is lit if it's inside the wave radius
  // Positions are brighter the closer they are to the wave edge
  // But all positions inside the radius should be at least somewhat visible
  
  if (distance > waveRadius) {
    // Outside the wave - dark
    return minAlpha
  }
  
  // Inside the wave - brightness should be highest at center and fade toward edge
  // This creates the effect where center is always brightest
  const brightnessAtCenter = 1.0
  const brightnessAtEdge = 0.05
  
  // Calculate brightness based on how close we are to center (distance 0)
  // distance=0 (center) should give brightnessAtCenter
  // distance=waveRadius (edge) should give brightnessAtEdge
  const normalizedDistance = distance / waveRadius
  const brightness = brightnessAtCenter - (normalizedDistance * (brightnessAtCenter - brightnessAtEdge))
  const easedBrightness = easeInOutQuad(brightness)
  
  // Scale overall brightness based on wave expansion progress
  // This creates a fade-in effect where brightness builds gradually
  let overallScale = 1.0
  if (frameInPulse < riseFrames) {
    // During rise: scale brightness by how far the wave has expanded
    overallScale = frameInPulse / riseFrames
  }
  
  const finalBrightness = easedBrightness * overallScale
  
  return minAlpha + (maxAlpha - minAlpha) * finalBrightness
}

/**
 * Creates frame strings for a pulsing animation where brightness spreads from center outward
 * Used for permission-awaiting state
 * @param options Configuration options for the pulse effect
 * @returns Array of frame strings (all identical since color generator handles animation)
 */
export function createPulseFrames(options: PulseOptions = {}): string[] {
  const width = options.width ?? 8
  const style = options.style ?? "blocks"
  const riseFrames = options.riseFrames ?? 4
  const fallFrames = options.fallFrames ?? 4
  const gapFrames = options.gapFrames ?? 2
  const restFrames = options.restFrames ?? 15
  const pulseCount = options.pulseCount ?? 2
  const minAlpha = options.minAlpha ?? 0
  const maxAlpha = options.maxAlpha ?? 1.0

  const singlePulse = riseFrames + fallFrames
  const totalFrames = (singlePulse * pulseCount) + (gapFrames * (pulseCount - 1)) + restFrames

  // Generate dynamic frames with different characters based on brightness
  const frames = Array.from({ length: totalFrames }, (_, frameIndex) => {
    return Array.from({ length: width }, (_, charIndex) => {
      const center = (width - 1) / 2
      const distance = Math.abs(charIndex - center)
      
      // Calculate alpha for this position at this frame
      const alpha = calculateSimpleBreathingAlpha(
        frameIndex,
        distance,
        singlePulse,
        pulseCount,
        restFrames,
        minAlpha,
        maxAlpha,
        riseFrames,
        fallFrames,
        width,
        gapFrames
      )
      
      // Choose character based on alpha/brightness level
      if (style === "diamonds") {
        if (alpha > 0.7) return "◆"        // Brightest
        if (alpha > 0.4) return "⬥"        // Medium-bright
        if (alpha > 0.2) return "⬩"        // Dim
        if (alpha > minAlpha) return "·"   // Edge of pulse
        return " "                          // Outside pulse/inactive
      }
      
      // Blocks style - use progressive block shading
      if (alpha > 0.9) return "█"           // Full block - brightest
      if (alpha > 0.7) return "▓"           // Dark shade
      if (alpha > 0.5) return "▒"          // Medium shade  
      if (alpha > 0.3) return "░"           // Light shade
      if (alpha > minAlpha) return "·"      // Edge of pulse (dot)
      return " "                             // Outside pulse (empty space)
    }).join("")
  })

  return frames
}

/**
 * Creates a color generator for pulsing animation with center-outward spread effect
 * Pattern: pulse up/down (twice), then rest, with brightness spreading from center to edges
 * @param options Configuration options for the pulse effect
 * @returns ColorGenerator function that calculates colors based on frame and character position
 */
export function createPulseColors(options: PulseOptions = {}): ColorGenerator {
  const width = options.width ?? 8
  const riseFrames = options.riseFrames ?? 4
  const fallFrames = options.fallFrames ?? 4
  const gapFrames = options.gapFrames ?? 2
  const restFrames = options.restFrames ?? 15
  const pulseCount = options.pulseCount ?? 2
  const minAlpha = options.minAlpha ?? 0
  const maxAlpha = options.maxAlpha ?? 1.0
  const spreadDelay = options.spreadDelay ?? 2

  const singlePulse = riseFrames + fallFrames
  const totalFrames = (singlePulse * pulseCount) + (gapFrames * (pulseCount - 1)) + restFrames

  const baseColor = options.color
    ? (options.color instanceof RGBA ? options.color : RGBA.fromHex(options.color as string))
    : RGBA.fromHex("#ffffff")

  return (frameIndex: number, charIndex: number, _totalFrames: number, totalChars: number) => {
    const frame = frameIndex % totalFrames
    
    // Calculate distance from center (0 for center chars, increases toward edges)
    const center = (totalChars - 1) / 2
    const distanceFromCenter = Math.abs(charIndex - center)
    
    // For breathing effect: calculate the "wave radius" at this frame
    // The wave expands and then contracts
    const alpha = calculateSimpleBreathingAlpha(
      frame,
      distanceFromCenter,
      singlePulse, 
      pulseCount, 
      restFrames, 
      minAlpha, 
      maxAlpha, 
      riseFrames, 
      fallFrames,
      totalChars,
      gapFrames
    )
    
    return RGBA.fromValues(baseColor.r, baseColor.g, baseColor.b, alpha)
  }
}
