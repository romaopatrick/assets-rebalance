'use client'

import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import * as finAssetsPanelService from '@/app/panels/actions'
import React, { useEffect, useState } from 'react'
import ResumeCard from '@/app/dashboard/components/resume-card'
import * as Form from '@radix-ui/react-form'
import MoneyInput from '@/app/components/inputs/money-input'
import SaveBottomBar from './components/save-bottom-bar'
import { ChangeFinAssetsPanelInputManager } from '@/app/panels/types'
import GroupList from './components/group/group-list'
import NewGroupModal from './components/group/new-group-modal'
import { FinAssetsGroup } from '@/lib/domain/fin-assets-group'
import { successSaveToast } from '@/lib/utils/toast'
import * as finAssetsBankAccountService from '@/app/accounts/actions'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import { useLoad } from '@/lib/hooks/use-load'
type Props = {
  params: {
    panelId: string
  }
}
export default function EditPainel({ params: { panelId } }: Props) {
  const [panel, setPanel] = useState<FinAssetsPanel>()
  const [accounts, setAccounts] = useState<FinAssetBankAccount[]>([])
  const [changed, setChanged] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<FinAssetsGroup | undefined>()
  const currentScore = panel?.children.map(x => x.score).reduce((v, acc) => acc + v)
  const valid = currentScore == 100

  const load = useLoad()
  const loadAccs = useLoad()

  const fetchPanel = async () => {
    await load.execute(async () => {
      const panel = await finAssetsPanelService.getPanelById(panelId)
      setPanel(panel)
    })
  }

  const fetchAccounts = async () => {
    await loadAccs.execute(async () => {
      const accs = await finAssetsBankAccountService.getAllBankAccounts()
      setAccounts(accs)
    })
  }

  const onSave = async () => {
    await load.execute(async () => {
      if (!panel) return;

      await finAssetsPanelService.changePanel(ChangeFinAssetsPanelInputManager.fromDomain(panel))
      successSaveToast("Panel")
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

  const handleAddGroup = (g: FinAssetsGroup) => {
    handleChange(p => {
      p.children.push(g)
      return p
    })
    setSelectedGroup(g)
  }

  useEffect(() => {
    fetchAccounts()
    fetchPanel()
  }, [])

  return ( panel &&
    <>
      <main className='p-12'>
        <div className='flex justify-between items-center'>
          <input className='text-4xl my-2 bg-slate-600 rounded-md w-fit p-2' onChange={v => handleChange(p => {
            p.name = v.target.value
            return p
          })} value={panel?.name} />
          <br/>
          <br/>
          <div className='flex text-4xl flex-col p-2'>
            <span className={currentScore != 100
              ? 'text-red-500'
              : 'text-green-400'}>{currentScore}</span>
            {currentScore != 100 && <span className='text-xs text-red-400'>=100</span>}
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
                  <Form.Label htmlFor='amountToInvest'>Available</Form.Label>
                  <div className='flex gap-2 items-center'>
                    <MoneyInput
                      id='amountToInvest'
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
              <span className='w-full my-6 border-b-2 border-b-green-800' />
              <GroupList accounts={accounts} value={selectedGroup} onChange={(gps) => handleChange(p => {
                p.children = gps
                return p
              })} groups={panel.children} />
            </div>
          }
        </Form.Root>
      </main>
      <SaveBottomBar valid={valid} onSave={onSave} onReset={onReset} loading={load.loading} changed={changed} />
      {panel && <NewGroupModal panel={panel} onAdd={handleAddGroup} />}
    </>
  )
}
