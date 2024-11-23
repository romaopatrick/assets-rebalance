import React from "react";
import * as Switch from "@radix-ui/react-switch";

type Props = {
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
};

export default function OnlyActiveSwitch({ checked = false, onChange }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="only-active-switch" className="flex text-sm font-medium">
        Active only
      </label>
      <Switch.Root
        id="only-active-switch"
        className={`w-12 h-6  rounded-full flex items-center  transition-colors 
          ${checked ? "bg-pink-700" : "bg-slate-600"}`}
        checked={checked}
        onCheckedChange={onChange}
      >
        <Switch.Thumb
          className={`w-5 h-5 rounded-full shadow transition-transform 
            ${checked ? "translate-x-6 bg-pink-950" : "translate-x-0.5 bg-slate-400"}`}
        />
      </Switch.Root>
    </div>
  );
}
