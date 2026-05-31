import { Effect, Context, Layer, ManagedRuntime } from "effect"
import { InstanceRef } from "./src/effect/instance-ref"
import { InstanceState } from "./src/effect/instance-state"

// Simulate the service structure
class MyService extends Context.Service<MyService, {
  readonly run: () => Effect.Effect<string>
}>()("MyService") {}

const myLayer = Layer.effect(
  MyService,
  Effect.gen(function* () {
    const state = yield* InstanceState.make((ctx) => Effect.gen(function* () {
      console.log("Init with ctx:", ctx.directory)
      return { value: 42 }
    }))
    
    return MyService.of({
      run: Effect.fn("MyService.run")(function* () {
        const data = yield* InstanceState.get(state)
        console.log("Run with data:", data.value)
        return "ok"
      }),
    })
  }),
)

const rt = ManagedRuntime.make(myLayer.pipe(Layer.provideMerge(Layer.empty)))

// Test 1: provideService on INNER effect
try {
  const result = await rt.runPromise(
    MyService.use((svc) => svc.run().pipe(Effect.provideService(InstanceRef, { directory: "/tmp", project: { id: "test" } } as any)))
  )
  console.log("Test 1 (inner) passed:", result)
} catch (err) {
  console.log("Test 1 (inner) failed:", err)
}

// Test 2: provideService on OUTER effect
try {
  const result = await rt.runPromise(
    MyService.use((svc) => svc.run()).pipe(Effect.provideService(InstanceRef, { directory: "/tmp2", project: { id: "test2" } } as any))
  )
  console.log("Test 2 (outer) passed:", result)
} catch (err) {
  console.log("Test 2 (outer) failed:", err)
}
