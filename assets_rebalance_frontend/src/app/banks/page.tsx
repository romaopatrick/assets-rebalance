import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank-service'
import React from 'react'
import BankItem from './components/bank-item'
import AddBankButton from './components/add-bank-button'
import { useErrorHandler } from '../components/hooks/use-error-handler'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'
import { redirect } from 'next/dist/server/api-utils'
import { FinAssetBank } from '@/domain/fin-asset-bank'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
type Props = {
    banks: FinAssetBank[]
    onlyActive?: boolean
}
export default function Banks({ onlyActive, banks }: Props) {
    const bankItems = banks.map(x => <BankItem key={x.id} bank={x} />)

    return (
        <div className='items-center'>
            <AddBankButton />
            <OnlyActiveSwitch onChange={undefined} checked={onlyActive} />
            <div className='flex w-[90%] gap-4 flex-wrap'>
                {bankItems}
            </div>
        </div>
    )
}

const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
    const { handleError } = useErrorHandler()
    try {
        const banks = await finAssetsBankService.all(Boolean(context.query.oa))

        return {
            notFound: false,
            props: {
                banks,
            }
        }
    } catch (e) {
        handleError(e as Error)
        return {
            props: {
                banks: []
            }
        }
    }
}