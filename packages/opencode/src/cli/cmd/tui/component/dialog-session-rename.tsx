import { DialogPrompt } from "@tui/ui/dialog-prompt"
import { useDialog } from "@tui/ui/dialog"
import { useSync } from "@tui/context/sync"
import { createMemo } from "solid-js"
import { useSDK } from "../context/sdk"

interface DialogSessionRenameProps {
  session: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function DialogSessionRename(props: DialogSessionRenameProps) {
  const dialog = useDialog()
  const sync = useSync()
  const sdk = useSDK()
  const session = createMemo(() => sync.session.get(props.session))

  return (
    <DialogPrompt
      title="Rename Session"
      value={session()?.title}
      onConfirm={async (value) => {
        await sdk.client.session.update({
          sessionID: props.session,
          title: value,
        })
        if (props.onSuccess) props.onSuccess()
        else dialog.clear()
      }}
      onCancel={() => {
        if (props.onCancel) props.onCancel()
        else dialog.clear()
      }}
    />
  )
}
