import { createStore } from "solid-js/store"
import { batch, createEffect, createMemo } from "solid-js"
import { useSync } from "@tui/context/sync"
import { useTheme } from "@tui/context/theme"
import { uniqueBy } from "remeda"
import path from "path"
import fs from "fs/promises"
import { Global } from "@/global"
import { iife } from "@/util/iife"
import { createSimpleContext } from "./helper"
import { useToast } from "../ui/toast"
import { Provider } from "@/provider/provider"
import { useArgs } from "./args"
import { RGBA } from "@opentui/core"
import { Log } from "@/util/log"

export const { use: useLocal, provider: LocalProvider } = createSimpleContext({
  name: "Local",
  init: () => {
    const sync = useSync()
    const toast = useToast()
    const log = Log.create({ service: "model" })

    function isModelValid(model: { providerID: string; modelID: string }) {
      const provider = sync.data.provider.find((x) => x.id === model.providerID)
      return !!provider?.models[model.modelID]
    }

    function getFirstValidModel(...modelFns: (() => { providerID: string; modelID: string } | undefined)[]) {
      for (const modelFn of modelFns) {
        const model = modelFn()
        if (!model) continue
        if (isModelValid(model)) return model
      }
    }

    // Automatically update model when agent changes
    createEffect(() => {
      const value = agent.current()
      if (value.model) {
        if (isModelValid(value.model))
          model.set({
            providerID: value.model.providerID,
            modelID: value.model.modelID,
          })
        else
          toast.show({
            variant: "warning",
            message: `Agent ${value.name}'s configured model ${value.model.providerID}/${value.model.modelID} is not valid`,
            duration: 3000,
          })
      }
    })

    const agent = iife(() => {
      const agents = createMemo(() => sync.data.agent.filter((x) => x.mode !== "subagent"))
      const [agentStore, setAgentStore] = createStore<{
        current: string
      }>({
        current: agents()[0].name,
      })
      const { theme } = useTheme()
      const colors = createMemo(() => [
        theme.secondary,
        theme.accent,
        theme.success,
        theme.warning,
        theme.primary,
        theme.error,
      ])
      return {
        list() {
          return agents()
        },
        current() {
          return agents().find((x) => x.name === agentStore.current)!
        },
        set(name: string) {
          if (!agents().some((x) => x.name === name))
            return toast.show({
              variant: "warning",
              message: `Agent not found: ${name}`,
              duration: 3000,
            })
          setAgentStore("current", name)
        },
        move(direction: 1 | -1) {
          batch(() => {
            let next = agents().findIndex((x) => x.name === agentStore.current) + direction
            if (next < 0) next = agents().length - 1
            if (next >= agents().length) next = 0
            const value = agents()[next]
            setAgentStore("current", value.name)
          })
        },
        color(name: string) {
          const agent = agents().find((x) => x.name === name)
          if (agent?.color) return RGBA.fromHex(agent.color)
          const index = agents().findIndex((x) => x.name === name)
          if (index === -1) return colors()[0]
          return colors()[index % colors().length]
        },
      }
    })

    const model = iife(() => {
      const [modelStore, setModelStore] = createStore<{
        ready: boolean
        model: Record<
          string,
          {
            providerID: string
            modelID: string
          }
        >
        recent: {
          providerID: string
          modelID: string
        }[]
        favorite: {
          providerID: string
          modelID: string
        }[]
      }>({
        ready: false,
        model: {},
        recent: [],
        favorite: [],
      })

      const file = Bun.file(path.join(Global.Path.state, "model.json"))

      // File system health check function
      async function checkFilesystemHealth() {
        const testFile = path.join(path.dirname(path.join(Global.Path.state, "model.json")), ".health-check")
        try {
          await Bun.write(testFile, "test")
          await fs.unlink(testFile)
          return true
        } catch (error: any) {
          log.error("Filesystem health check failed", { error: error.message })
          return false
        }
      }

      // Enhanced save function with atomic writes, error handling, and backup
      async function save() {
        const targetPath = path.join(Global.Path.state, "model.json")
        const tempPath = targetPath + ".tmp"
        const backupPath = targetPath + ".backup"

        try {
          log.debug("model.save: attempting to write", {
            path: targetPath,
            content: { recent: modelStore.recent, favorite: modelStore.favorite },
          })

          // Check filesystem health first
          const healthOk = await checkFilesystemHealth()
          if (!healthOk) {
            throw new Error("Filesystem health check failed")
          }

          // Write to temp file first (atomic write)
          await Bun.write(
            tempPath,
            JSON.stringify(
              {
                recent: modelStore.recent,
                favorite: modelStore.favorite,
              },
              null,
              2,
            ),
          )

          // Verify temp file content
          const tempContent = await Bun.file(tempPath).text()
          const parsed = JSON.parse(tempContent)

          if (!Array.isArray(parsed.recent) || !Array.isArray(parsed.favorite)) {
            throw new Error("Write verification failed - invalid JSON structure")
          }

          // Atomic rename
          await fs.rename(tempPath, targetPath)

          log.debug("model.save: atomic write successful", { targetPath })

          // Create backup after successful save
          try {
            await Bun.write(
              backupPath,
              JSON.stringify(
                {
                  recent: modelStore.recent,
                  favorite: modelStore.favorite,
                },
                null,
                2,
              ),
            )
            log.debug("model.save: backup created", { backupPath })
          } catch (backupError: any) {
            log.warn("model.save: backup failed", { error: backupError.message })
          }

          // Final verification
          const verifyContent = await Bun.file(targetPath).text()
          const verifyParsed = JSON.parse(verifyContent)

          if (!verifyParsed.recent?.[0]?.modelID || !Array.isArray(verifyParsed.favorite)) {
            throw new Error("Final verification failed")
          }

          log.debug("model.save: write successful and verified")
        } catch (error: any) {
          // Cleanup temp file
          try {
            await fs.unlink(tempPath)
          } catch (cleanupError: any) {
            log.warn("model.save: temp file cleanup failed", { error: cleanupError.message })
          }

          log.error("model.save: failed to write", {
            error: error.message,
            path: targetPath,
            stack: error.stack,
          })

          toast.show({
            message: `Failed to save model preference: ${error.message}`,
            variant: "error",
            duration: 5000,
          })
        }
      }

      file
        .json()
        .then((x) => {
          if (Array.isArray(x.recent)) setModelStore("recent", x.recent)
          if (Array.isArray(x.favorite)) setModelStore("favorite", x.favorite)
        })
        .catch(() => {})
        .finally(() => {
          setModelStore("ready", true)
        })

      const args = useArgs()
      const fallbackModel = createMemo(() => {
        if (args.model) {
          const { providerID, modelID } = Provider.parseModel(args.model)
          if (isModelValid({ providerID, modelID })) {
            return {
              providerID,
              modelID,
            }
          }
        }

        if (sync.data.config.model) {
          const { providerID, modelID } = Provider.parseModel(sync.data.config.model)
          if (isModelValid({ providerID, modelID })) {
            return {
              providerID,
              modelID,
            }
          }
        }

        for (const item of modelStore.recent) {
          if (isModelValid(item)) {
            return item
          }
        }
        const provider = sync.data.provider[0]
        const model = sync.data.provider_default[provider.id] ?? Object.values(provider.models)[0].id
        return {
          providerID: provider.id,
          modelID: model,
        }
      })

      const currentModel = createMemo(() => {
        const a = agent.current()
        return getFirstValidModel(
          () => modelStore.model[a.name],
          () => a.model,
          fallbackModel,
        )!
      })

      return {
        current: currentModel,
        get ready() {
          return modelStore.ready
        },
        recent() {
          return modelStore.recent
        },
        favorite() {
          return modelStore.favorite
        },
        parsed: createMemo(() => {
          const value = currentModel()
          const provider = sync.data.provider.find((x) => x.id === value.providerID)!
          const model = provider.models[value.modelID]
          return {
            provider: provider.name ?? value.providerID,
            model: model.name ?? value.modelID,
          }
        }),
        cycle(direction: 1 | -1) {
          const current = currentModel()
          if (!current) return
          const recent = modelStore.recent
          const index = recent.findIndex((x) => x.providerID === current.providerID && x.modelID === current.modelID)
          if (index === -1) return
          let next = index + direction
          if (next < 0) next = recent.length - 1
          if (next >= recent.length) next = 0
          const val = recent[next]
          if (!val) return
          setModelStore("model", agent.current().name, { ...val })

          // ADD: Update recent models to persist the change
          const uniq = uniqueBy([val, ...modelStore.recent], (x) => x.providerID + x.modelID)
          if (uniq.length > 10) uniq.pop()
          setModelStore("recent", uniq)
          save()
        },
        cycleFavorite(direction: 1 | -1) {
          const favorites = modelStore.favorite.filter((item) => isModelValid(item))
          if (!favorites.length) {
            toast.show({
              variant: "info",
              message: "Add a favorite model to use this shortcut",
              duration: 3000,
            })
            return
          }
          const current = currentModel()
          let index = favorites.findIndex((x) => x.providerID === current.providerID && x.modelID === current.modelID)
          if (index === -1) {
            index = direction === 1 ? 0 : favorites.length - 1
          } else {
            index += direction
            if (index < 0) index = favorites.length - 1
            if (index >= favorites.length) index = 0
          }
          const next = favorites[index]
          if (!next) return
          setModelStore("model", agent.current().name, { ...next })
          const uniq = uniqueBy([next, ...modelStore.recent], (x) => x.providerID + x.modelID)
          if (uniq.length > 10) uniq.pop()
          setModelStore("recent", uniq)
          save()
        },
        set(model: { providerID: string; modelID: string }, options?: { recent?: boolean }) {
          batch(() => {
            log.debug("model.set called", { model, options })

            if (!isModelValid(model)) {
              log.warn("model.set: invalid model", { model })
              toast.show({
                message: `Model ${model.providerID}/${model.modelID} is not valid`,
                variant: "warning",
                duration: 3000,
              })
              return
            }

            setModelStore("model", agent.current().name, model)

            if (options?.recent) {
              log.debug("model.set: updating recent models", { model, currentRecent: modelStore.recent })
              const uniq = uniqueBy([model, ...modelStore.recent], (x) => x.providerID + x.modelID)
              if (uniq.length > 10) uniq.pop()
              setModelStore("recent", uniq)
              save() // Now async and error-handled
            }
          })
        },
        toggleFavorite(model: { providerID: string; modelID: string }) {
          batch(() => {
            if (!isModelValid(model)) {
              toast.show({
                message: `Model ${model.providerID}/${model.modelID} is not valid`,
                variant: "warning",
                duration: 3000,
              })
              return
            }
            const exists = modelStore.favorite.some(
              (x) => x.providerID === model.providerID && x.modelID === model.modelID,
            )
            const next = exists
              ? modelStore.favorite.filter((x) => x.providerID !== model.providerID || x.modelID !== model.modelID)
              : [model, ...modelStore.favorite]
            setModelStore("favorite", next)
            save()
          })
        },
      }
    })

    const result = {
      model,
      agent,
    }
    return result
  },
})
