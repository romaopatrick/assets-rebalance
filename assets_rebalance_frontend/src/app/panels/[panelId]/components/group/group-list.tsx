import { FinAssetsGroup } from '@/domain/fin-assets-group'
import React, { useEffect, useState } from 'react'
import GroupItem from './group-item'
import * as Tabs from "@radix-ui/react-tabs";
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { finAssetCategoryDictionary } from '@/domain/enums/fin-asset-category.enum';
import FormControlNumeric from '@/app/components/inputs/form-control-numeric';
import NumericInput from '@/app/components/inputs/numeric-input';
import { replaceAtIndex } from '@/utils/array';

type Props = {
    groups: FinAssetsGroup[]
    value?: FinAssetsGroup
    onChange?: (newValues: FinAssetsGroup[]) => void
}
export default function GroupList({ groups, onChange, value }: Props) {
    const [selected, setSelected] = useQueryParam('s', withDefault(StringParam, '0'))
    const curGroup = groups.at(Number(selected) ?? 0)
    const valueIdx = value && groups.findIndex(x => x.name === value.name)

    const onTabChange = (v: string) => {
        setSelected(v)
    }

    const handleChange = (id: string, fnSetGroup: (group: FinAssetsGroup) => FinAssetsGroup) => {
        const idx = Number(id) ?? 0
        const groupItm = groups.at(idx)
        if (!groupItm) return;

        groups = replaceAtIndex(groups, idx, fnSetGroup(groupItm))

        onChange?.(groups)
    }

    useEffect(() => {
        if(value) setSelected(valueIdx?.toString())
    }, [value])

    return (
        <Tabs.Root className='flex flex-col gap-4' value={selected}>
            <Tabs.List className='flex justify-between items-end max-h-10'>
                <div className='flex'>
                    {
                        groups.map((x, i) => {
                            const id = i.toString()
                            const active = selected === id

                            return <Tabs.Trigger onClick={() => !active && onTabChange(id)}
                                className={`p-2 flex items-center bg-pink-700 rounded-t-sm 
                                ${!active ? 'bg-slate-600 mt-2' : ''}
                        `} key={id} value={id}>
                                {x.name}
                            </Tabs.Trigger>
                        })
                    }
                </div>
                <div className='flex items-end gap-4'>
                    <div className='flex gap-2'>
                        <div className='relative flex flex-col items-center'>
                            <span className='absolute -top-3 text-slate-400 z-10 text-[0.6rem]'>Score</span>
                            <NumericInput
                                maxLength={3}
                                min={1}
                                max={100}
                                value={curGroup?.score}
                                onChange={v => handleChange(selected, g => {
                                    g.score = v as number
                                    return g
                                })}
                                className='outline-none bg-slate-600 rounded-md px-2 text-xl w-14' />
                        </div>
                    </div>
                    <span className='italic text-pink-700'>{finAssetCategoryDictionary[curGroup?.category ?? 0]}</span>
                </div>
            </Tabs.List>
            {
                groups.map((x, i) => <Tabs.Content key={i} value={i.toString()}>
                    <GroupItem group={x} onChange={(g) => handleChange(i.toString(), _  => g)}/>
                </Tabs.Content>)
            }
        </Tabs.Root>
    )
}
