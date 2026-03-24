import { Global } from "@/global"
import { Filesystem } from "@/util/filesystem"
import { createSignal, type Setter } from "solid-js"
import { createStore } from "solid-js/store"
import { createSimpleContext } from "./helper"
import path from "path"

export const { use: useKV, provider: KVProvider } = createSimpleContext({
  name: "KV",
  init: () => {
    const [ready, setReady] = createSignal(false)
    const [store, setStore] = createStore<Record<string, any>>()
    const ephemeral: Record<string, any> = {}
    const filePath = path.join(Global.Path.state, "kv.json")

    Filesystem.readJson(filePath)
      .then((x) => {
        setStore(x)
      })
      .catch(() => {})
      .finally(() => {
        setReady(true)
      })

    const result = {
      get ready() {
        return ready()
      },
      get store() {
        return store
      },
      signal<T>(name: string, defaultValue: T) {
        if (store[name] === undefined) setStore(name, defaultValue)
        return [
          function () {
            return result.get(name, defaultValue)
          },
          function setter(value: T | ((prev: T) => T)) {
            if (typeof value === "function") {
              const prev = result.get(name, defaultValue)
              result.set(name, (value as (prev: T) => T)(prev))
            } else {
              result.set(name, value)
            }
          },
        ] as const
      },
      get(key: string, defaultValue?: any) {
        return store[key] ?? defaultValue
      },
      set(key: string, value: any) {
        setStore(key, value)
        Filesystem.writeJson(filePath, store)
      },
      getEphemeral(key: string, defaultValue?: any) {
        return ephemeral[key] ?? defaultValue
      },
      setEphemeral(key: string, value: any) {
        ephemeral[key] = value
      },
    }
    return result
  },
})
