import { FixedIncomeIndexer, fixedIncomeIndexerDict } from '@/lib/domain/enums/fixed-income-indexer.enum'
import Select from 'react-select'
import React from 'react'

type Props = {
    value?: FixedIncomeIndexer
    onSelect?: (s: FixedIncomeIndexer) => void
}

export default function IndexerSelect({ value, onSelect }: Props) {
    const options = [
        {
            value: FixedIncomeIndexer.CDI,
            label: fixedIncomeIndexerDict[FixedIncomeIndexer.CDI]
        },
        {
            value: FixedIncomeIndexer.IPCA,
            label: fixedIncomeIndexerDict[FixedIncomeIndexer.IPCA]

        },
        {
            value: FixedIncomeIndexer.FIXED,
            label: fixedIncomeIndexerDict[FixedIncomeIndexer.FIXED]
        }
    ]

    const selectedOpt = options.find(x => x.value === value);
    function handleSelect(value: FixedIncomeIndexer) {
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
                option: () => `!cursor-pointer p-2 font-arial hover:!bg-slate-900 data-[selected=true]:bg-green-400 z-100`,
            }}
            placeholder={''}
            onChange={
                (e) => handleSelect(e?.value ?? 1)
            }
            className='w-20 rounded-md'
            options={options} />
    )
}
