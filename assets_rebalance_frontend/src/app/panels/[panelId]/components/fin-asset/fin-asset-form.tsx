import FormControlNumeric from '@/app/components/inputs/form-control-numeric'
import { FinAsset } from '@/domain/fin-asset'
import * as Form from '@radix-ui/react-form'
import React, { useState } from 'react'
type Props = {
  asset: FinAsset
  onChange?: (fa: FinAsset) => void
}
export default function FinAssetForm({
  asset,
  onChange
}: Props) {

  const handleChange = (fnSetAsset: (fa: FinAsset) => FinAsset) => {
    onChange?.(fnSetAsset(asset))
  }

  return (
    <Form.Root className='p-4'>
      <div className='flex gap-2'>
        <Form.Field className='flex flex-col gap-2' name='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className='text-lg px-2 rounded-md bg-slate-600'
            onChange={v => handleChange(fa => {
              fa.name = v.target.value
              return fa
            })} 
            value={asset?.name} />
        </Form.Field>
        <Form.Field className='flex flex-col gap-2' name='name'>
          <Form.Label>Score</Form.Label>
          <FormControlNumeric
            className='text-lg px-2 rounded-md bg-slate-600'
            onChange={v => handleChange(fa => {
              fa.score = v as number
              return fa
            })} 
            value={asset?.score} />
        </Form.Field>

      </div>
    </Form.Root>
  )
}
