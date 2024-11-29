import { FinAssetCategory, finAssetCategoryDictionary } from '@/domain/enums/fin-asset-category.enum'
import { getEnumKeys } from '@/utils/enum'
import React from 'react'
import Select, { Props } from 'react-select'
type CategorySelectProps = Props & {
    value?: FinAssetCategory
    onChange?: (v: FinAssetCategory) => void
}

const options = getEnumKeys(FinAssetCategory)
    .map((k) => {
        const value = FinAssetCategory[k]
        return ({
            value: value,
            label: finAssetCategoryDictionary[value]
        })
    })

export default function CategorySelect({ value, onChange, ...props }: CategorySelectProps) {
    console.log('value', value)

    return (
        <Select
            {...props}
            value={{ value, label: finAssetCategoryDictionary[value!] }}
            onChange={(v: any) => onChange?.(v.value as FinAssetCategory)}
            options={options}
        />
    )
}
