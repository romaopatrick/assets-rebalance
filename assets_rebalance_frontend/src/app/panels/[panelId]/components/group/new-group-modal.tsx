import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Dialog from '@radix-ui/react-dialog'
import PlusButton from '@/app/components/buttons/plus-button'
import FormControlNumeric from '@/app/components/inputs/form-control-numeric'
import { FinAssetsGroup } from '@/domain/fin-assets-group'
import { FinAssetsPanel } from '@/domain/fin-assets-panel'
import { FinAssetCategory, finAssetCategoryDictionary } from '@/domain/enums/fin-asset-category.enum'
import CategorySelect from '@/app/components/selects/category-select'
type Props = {
  panel: FinAssetsPanel
  onAdd?: (group: FinAssetsGroup) => void
}
export default function NewGroupModal({ panel, onAdd }: Props) {
  const [group, setGroup] = useState<FinAssetsGroup>({
    adjustAmount: 0,
    category: 0,
    children: [],
    currentAmount: 0,
    name: '',
    recommendedAmount: 0,
    score: 0,
    scorePercent: 0
  })

  const handleChange = (fnSetGroup: (g: FinAssetsGroup) => FinAssetsGroup) => {
    const g = fnSetGroup(group)

    setGroup({ ...g })
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <PlusButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-600 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <Form.Root className='flex flex-col gap-4'>
            <h1 className='text-3xl'>Group {group.name}</h1>
            <Form.Field className='flex flex-col' name='name'>
              <Form.Label>
                Name
              </Form.Label>
              <Form.Control value={group.name}
                onChange={v =>
                  handleChange(g => {
                    g.name = v.target.value
                    return g
                  })}
                className='outline-none rounded-sm  text-slate-900 px-2 text-lg py-1' />
            </Form.Field>
            <div className='flex gap-4'>
              <Form.Field className='flex  flex-col' name='score'>
                <Form.Label>
                  Score
                </Form.Label>
                <FormControlNumeric value={group.score} onChange={v => handleChange(x => {
                  x.score = v as number
                  return x
                })}
                  maxLength={3}
                  className='outline-none text-slate-900  w-24 rounded-sm px-2 text-lg py-1' />
              </Form.Field>
              <Form.Field className='flex flex-col flex-1' name='category'>
                <Form.Label>
                  Category
                </Form.Label>
                <Form.Control asChild>
                  <CategorySelect value={group.category} onChange={v =>
                    handleChange(g => {
                      g.category = v as FinAssetCategory
                      return g
                    })}
                    className='text-slate-900 cursor-pointer outline-none' />
                </Form.Control>
              </Form.Field>
            </div>
          </Form.Root>
          <Dialog.Close asChild>

            <button onClick={_ => onAdd?.(group)}
              className='w-full mt-12 bg-pink-700 p-2 rounded-md hover:bg-pink-600 transition-colors duration-200'
            >Add</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
