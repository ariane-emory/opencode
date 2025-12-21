import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Font } from "@ariane-emory/ui/font"
import { MetaProvider } from "@solidjs/meta"
import { MarkedProvider } from "@ariane-emory/ui/context/marked"
import { Suspense } from "solid-js"
import "./app.css"
import { Favicon } from "@ariane-emory/ui/favicon"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <MarkedProvider>
            <Favicon />
            <Font />
            <Suspense>{props.children}</Suspense>
          </MarkedProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
