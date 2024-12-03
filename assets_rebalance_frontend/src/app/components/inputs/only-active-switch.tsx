'use client'
import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { BooleanParam, QueryParamProvider, useQueryParam, withDefault } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

type Props = {
  action?: (newValue: boolean) => void;
};

const ButtonWrap = ({action}: Props) => {
  const [checked, setChecked] = useQueryParam('oa', withDefault(BooleanParam, true))

  const handleChange = async (d: boolean) => {
    setChecked(d)
    action?.(d)
  }
  return (
      <div className="flex gap-2 items-center">
        <label htmlFor="only-active-switch" className="flex text-sm font-medium">
          Active only
        </label>
        <Switch.Root
          type="submit"
          name="checked"
          id="only-active-switch"
          className={`w-12 h-6  rounded-full flex items-center  transition-colors 
          ${checked ? "bg-green-800" : "bg-slate-600"}`}
          checked={checked}
          onCheckedChange={x => handleChange(x)}
        >
          <Switch.Thumb
            className={`w-5 h-5 rounded-full shadow transition-transform 
            ${checked ? "translate-x-6 bg-green-950" : "translate-x-0.5 bg-slate-400"}`}
          />
        </Switch.Root>
      </div>
  );
}
export default function OnlyActiveSwitch(props: Props) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <ButtonWrap {...props}/>
    </QueryParamProvider>
  );
}
