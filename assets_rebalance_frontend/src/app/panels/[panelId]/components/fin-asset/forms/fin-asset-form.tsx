import AccountsSelect from '@/app/components/selects/accounts-select'
import FormControlNumeric from '@/app/components/inputs/form-control-numeric'
import MoneyInput from '@/app/components/inputs/money-input'
import FinAssetStatusSelect from '@/app/components/selects/fin-asset-status-select'
import { FinAsset } from '@/lib/domain/fin-asset'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import * as Form from '@radix-ui/react-form'
import React from 'react'

export type FinAssetFormProps = {
  asset: FinAsset
  account: FinAssetBankAccount
  onChange?: (fa: FinAsset) => void
  edit?: boolean
  className?: string
} & React.PropsWithChildren


export default function FinAssetForm({
  asset,
  onChange,
  edit,
  account,
  children,
  className
}: FinAssetFormProps) {
  asset.accountId = account?.id ?? ''
  const handleChange = (fnSetAsset: (fa: FinAsset) => FinAsset) => {
    onChange?.(fnSetAsset(asset))
  }

  return (
    <Form.Root className={`p-4 ${className} `}>
      <div className='flex gap-4'>
        <div className='flex flex-col gap-2'>
          <label>Current</label>
          <MoneyInput inputProps={
            {
              readOnly: true,
              disabled: true
            }
          }
            value={asset.currentAmount ?? 0}
            className='text-lg px-2 py-1  rounded-md bg-slate-600 hover:bg-slate-700' />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Recommended</label>
          <MoneyInput inputProps={
            {
              readOnly: true,
              disabled: true
            }
          }
            value={asset.recommendedAmount ?? 0}
            className='text-lg px-2 py-1  rounded-md bg-slate-600 hover:bg-slate-700' />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Adjust</label>
          <MoneyInput inputProps={
            {
              readOnly: true,
              disabled: true
            }
          }
            value={asset.adjustAmount ?? 0}
            className='text-lg px-2 py-1  rounded-md bg-slate-600 hover:bg-slate-700' />
        </div>
        <div className='flex flex-col gap-2'>
          <label>Buy Adjust</label>
          <MoneyInput inputProps={
            {
              readOnly: true,
              disabled: true
            }
          }
            value={asset.buyAdjustAmount ?? 0}
            className='text-lg px-2 py-1 rounded-md bg-slate-600 hover:bg-slate-700' />
        </div>
      </div>
      <br />
      <div className='flex gap-2 flex-wrap'>
        <Form.Field className='flex flex-col gap-2' name='name'>
          <Form.Label className='text-sm' >Name</Form.Label>
          <Form.Control
            className='text-lg px-2 py-1  rounded-md bg-slate-600'
            onChange={v => handleChange(fa => {
              fa.name = v.target.value
              return fa
            })}
            value={asset?.name} />
        </Form.Field>
        {
          !edit && <Form.Field className='flex flex-col gap-2' name='name'>
            <Form.Label className='text-sm' >Tag</Form.Label>
            <Form.Control
              className='text-lg px-2 py-1  rounded-md bg-slate-600'
              onChange={v => handleChange(fa => {
                fa.tag = v.target.value
                return fa
              })}
              value={asset?.tag!} />
          </Form.Field>
        }
        <Form.Field className='flex flex-col gap-2' name='score'>
          <Form.Label className='text-sm'>Score</Form.Label>
          <FormControlNumeric
            className='text-lg px-2 py-1 rounded-md bg-slate-600'
            onChange={v => handleChange(fa => {
              fa.score = v as number
              return fa
            })}
            value={asset?.score} />
        </Form.Field>

        <Form.Field name='account' className='flex flex-col gap-2'>
          <Form.Label className='text-sm'>Account</Form.Label>
          <AccountsSelect account={account} onSelect={f => handleChange(x => {
            x.accountId = f.id!

            return x
          })} />
        </Form.Field>

        <Form.Field name='currentAmount' className='flex flex-col gap-2'>
          <Form.Label className='text-sm'>Current Amount</Form.Label>
          <MoneyInput
            className='text-xl '
            inputClassName='py-1 bg-slate-600 rounded-lg'
            value={asset.currentAmount}
            onChange={v => handleChange(x => {
              x.currentAmount = v
              return x
            })}
          />
        </Form.Field>

        <Form.Field name='status' className='flex flex-col gap-2'>
          <Form.Label className='text-sm'>Status</Form.Label>
          <FinAssetStatusSelect
            value={asset.status}
            onSelect={v => handleChange(fa => {
              fa.status = v
              return fa
            })}
          />
        </Form.Field>
        <Form.Field name='currentQuantity' className='flex flex-col gap-2'>
          <Form.Label className='text-sm'>Current Quantity</Form.Label>
          <div className='flex gap-1'>
            <Form.Control type='number'
              className='text-lg px-2 py-1 rounded-md bg-slate-600 appearance-none'
              onChange={v => handleChange(fa => {
                fa.currentQuantity = v.target.value ? Number(v.target.value) : undefined
                return fa
              })}
              value={asset.currentQuantity} />
          </div>
        </Form.Field>
      </div>
      {children}
    </Form.Root>
  )
}
