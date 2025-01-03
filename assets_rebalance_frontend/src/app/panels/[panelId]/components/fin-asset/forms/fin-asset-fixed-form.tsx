import React from 'react'
import FinAssetForm, { FinAssetFormProps } from './fin-asset-form'
import * as Form from '@radix-ui/react-form'
import MoneyInput from '@/app/components/inputs/money-input'
import { FinAsset } from '@/lib/domain/fin-asset'
import { FixedIncomeIndexer } from '@/lib/domain/enums/fixed-income-indexer.enum'
const defaultFixedIncomeData = {
    applicationAmount: 0,
    expirationDate: new Date(),
    grossValue: 0,
    indexer: FixedIncomeIndexer.CDI,
    indexerPercent: 0,
    netValue: 0,
}
export default function FinAssetFixedForm(props: FinAssetFormProps) {
    const { asset, account, onChange } = props

    asset.accountId = account?.id ?? ''
    if (!asset.fixedIncomeData)
        asset.fixedIncomeData = { ...defaultFixedIncomeData }

    const handleChange = (fnSetAsset: (fa: FinAsset) => FinAsset) => {
        onChange?.(fnSetAsset(asset))
    }

    return (
        <>
            <FinAssetForm {...props} className={`flex flex-col justify-end w-full ${props.className}`}>
                <div className='flex flex-col w-full items-end'>
                    <span>Fixed income data</span>
                    <span className=' bg-green-800 h-[1px] mb-4 w-full' />
                </div>
                <div className='flex gap-2 flex-wrap'>

                    <Form.Field name='fixedIncomeData.applicationAmount' className='flex flex-col gap-2'>
                        <Form.Label className='text-sm'>Application Amount</Form.Label>
                        <MoneyInput
                            className='text-xl '
                            inputClassName='py-1 bg-slate-600 rounded-lg'
                            value={asset.fixedIncomeData.applicationAmount!}
                            onChange={v => handleChange(x => {
                                x.fixedIncomeData!.applicationAmount = v
                                return x
                            })}
                        />
                    </Form.Field>
                    <Form.Field name='fixedIncomeData.netValue' className='flex flex-col gap-2'>
                        <Form.Label className='text-sm'>Net Value</Form.Label>
                        <MoneyInput
                            className='text-xl '
                            inputClassName='py-1 bg-slate-600 rounded-lg'
                            value={asset.fixedIncomeData.netValue!}
                            onChange={v => handleChange(x => {
                                x.fixedIncomeData!.netValue = v
                                return x
                            })}
                        />
                    </Form.Field>
                    <Form.Field name='fixedIncomeData.grossValue' className='flex flex-col gap-2'>
                        <Form.Label className='text-sm'>Gross Value</Form.Label>
                        <MoneyInput
                            className='text-xl '
                            inputClassName='py-1 bg-slate-600 rounded-lg'
                            value={asset.fixedIncomeData.grossValue!}
                            onChange={v => handleChange(x => {
                                x.fixedIncomeData!.grossValue = v
                                return x
                            })}
                        />
                    </Form.Field>
                </div>
                <br />
            </FinAssetForm>
        </>
    )
}
