import React from 'react'
import * as Switch from "@radix-ui/react-switch";


type Props = {
  checked?: boolean
  onChange?: (newValue: boolean) => void
}
export default function OnlyActiveSwitch({ checked, onChange }: Props) {
  return (
    <div>
      <Switch.Root>
        <Switch.Thumb checked={checked} onCheckedChange={onChange} className=''/>
      </Switch.Root>
    </div>
  )
}
