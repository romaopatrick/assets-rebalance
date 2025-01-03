import { FinAssetStatus } from '@/lib/domain/enums/fin-asset-status.enum'
import React from 'react'
import Select from 'react-select'

type Props = {
    value?: FinAssetStatus
    onSelect?: (s: FinAssetStatus) => void
}
export default function FinAssetStatusSelect({ value, onSelect }: Props) {
    const options = [
        {
            value: FinAssetStatus.Active,
            label: "Active"
        },
        {
            value: FinAssetStatus.Inactive,
            label: "Inactive"
        },
        {
            value: FinAssetStatus.Settled,
            label: "Settled"
        }
    ]

    const selectedOpt = options.find(x => x.value === value);
    function handleSelect(value: FinAssetStatus) {
        onSelect?.(value)
    }
        
    return (
        <Select
            value={selectedOpt!}
            unstyled
            classNames={{
                control: _ => `max-h-2`,
                container: () => `!text-slate-100 !bg-slate-600  outline-none`,
                group: () => `!text-slate-100 !bg-slate-600  `,
                valueContainer: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none px-2`,
                menu: () => `max-h-2 !text-slate-100 !bg-slate-600  !outline-none !border-none cursor-pointer`,
                menuList: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none`,
                singleValue: () => `!text-slate-100 !bg-slate-600  !outline-none !border-none`,
                input: () => `!text-slate-100 !cursor-text `,
                option: () => `!cursor-pointer p-2 font-arial hover:!bg-slate-900 data-[selected=true]:bg-green-400`,
            }}
            placeholder={''}
            onChange={
                (e) => handleSelect(e?.value ?? 1)
            }
            className='w-72 rounded-md'
            options={options} />
    )
}
