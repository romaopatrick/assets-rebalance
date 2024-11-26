'use client'

import { useLoad } from '@/app/components/hooks/use-load'
import { FinAssetsPanel } from '@/domain/fin-assets-panel'
import { finAssetsPanelService } from '@/services/fin-assets-panel/fin-assets-panel.service'
import React, { useEffect, useState } from 'react'
import ResumeCard from '@/app/dashboard/components/resume-card'
import FormControlNumeric from '@/app/components/inputs/form-control-numeric'
import * as Form from '@radix-ui/react-form'
import MoneyInput from '@/app/components/inputs/money-input'
import SaveBottomBar from './components/save-bottom-bar'
import { ChangeFinAssetsPanelInput } from '@/boundaries/change-fin-assets-panel.input'
import GroupList from './components/group-list'
import RedirectPlusButton from '@/app/components/buttons/redirect-plus-button'
import PlusButton from '@/app/components/buttons/plus-button'
type Props = {
  params: {
    panelId: string
  }
}
export default function EditPainel({ params: { panelId } }: Props) {
  const [panel, setPanel] = useState<FinAssetsPanel>()
  const [changed, setChanged] = useState(false)
  const currentScore = panel?.children.map(x => x.score).reduce((v, acc) => acc + v)
  const valid = currentScore == 100 
  
  const load = useLoad()

  const fetchPanel = async () => {
    await load.execute(async () => {
      const panel = await finAssetsPanelService.getById(panelId)
      setPanel(panel)
    })
  }


  const onSave = async () => {
    await load.execute(async () => {
      if (!panel) return;

      await finAssetsPanelService.change(ChangeFinAssetsPanelInput.fromDomain(panel))
      onReset()
    })
  }

  const onReset = async () => {
    await fetchPanel()
    setChanged(false)
  }

  const handleChange = (fnSetPanel: (p: FinAssetsPanel) => FinAssetsPanel) => {
    if (!panel) return;

    let p = { ...panel }
    p = fnSetPanel(p)
    setPanel({ ...p })
    setChanged(true)
  }


  useEffect(() => { fetchPanel() }, [])

  return (
    <>
      <main className='p-12'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>{panel?.name}</h1>
          <div className='flex text-4xl flex-col p-2'>
            <span className={currentScore != 100 
              ? 'text-red-500'
              :'text-green-400' }>{currentScore}</span>
              {currentScore != 100 && <span className='text-xs text-red-400'>=100</span> }
          </div>
        </div>
        <Form.Root className='flex flex-col gap-4'>
          
          {
            panel &&
            <div className='flex flex-col w-full'>
              <div className='flex gap-4 flex-wrap'>

                <ResumeCard amount={panel?.totalAmount} className='gap-4 w-52' label='Total' />
                <ResumeCard amount={panel?.investedAmount} className='gap-4 w-52' label='Invested' />
                <Form.Field name='amountToInvest' className='flex flex-col gap-4 w-52 bg-slate-800 p-2 rounded-md'>
                  <Form.Label>Available</Form.Label>
                  <div className='flex gap-2 items-center'>
                    <MoneyInput
                      className='text-2xl'
                      inputClassName='bg-slate-600'
                      value={panel.amountToInvest}
                      onChange={v => handleChange(x => {
                        x.amountToInvest = v
                        return x
                      })} />
                  </div>
                </Form.Field>
              </div>
              <span className='w-full my-6 border-b-2 border-b-pink-900' />
              <GroupList onChange={(gps) => handleChange(p => {
                p.children = gps
                return p
              })} groups={panel.children} />
            </div>

          }
        </Form.Root>
      </main>
      <PlusButton />
      <SaveBottomBar valid={valid} onSave={onSave} onReset={onReset} loading={load.loading} changed={changed} />
    </>
  )
}
