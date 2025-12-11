import { Global } from "@/global"
import { createSignal, createEffect, type Setter } from "solid-js"
import { createStore } from "solid-js/store"
import { createSimpleContext } from "./helper"
import path from "path"

export const { use: useKV, provider: KVProvider } = createSimpleContext({
  name: "KV",
  init: () => {
    const [ready, setReady] = createSignal(false)
    const [kvStore, setKvStore] = createStore<Record<string, any>>()
    const file = Bun.file(path.join(Global.Path.state, "kv.json"))

    file
      .json()
      .then((x) => {
        setKvStore(x)
      })
      .catch(() => {})
      .finally(() => {
        setReady(true)
      })

    const result = {
      get ready() {
        return ready()
      },
      signal<T>(name: string, defaultValue: T) {
        // Initialize signal with default value
        const [value, setValue] = createSignal<T>(defaultValue)

        // Once KV is ready, load persisted value if it exists
        createEffect(() => {
          if (ready()) {
            const persisted = kvStore[name]
            if (persisted !== undefined) {
              setValue(() => persisted as T)
            }
          }
        })

        // Return signal with getter/setter that syncs to KV
        return [
          function () {
            return value()
          },
          function setter(next: Setter<T>) {
            const nextValue = typeof next === "function" ? (next as (prev: T) => T)(value()) : next
            setValue(() => nextValue)
            result.set(name, nextValue)
          },
        ] as const
      },
      get(key: string, defaultValue?: any) {
        return kvStore[key] ?? defaultValue
      },
      set(key: string, value: any) {
        setKvStore(key, value)
        Bun.write(file, JSON.stringify(kvStore, null, 2))
      },
    }
    return result
  },
})
