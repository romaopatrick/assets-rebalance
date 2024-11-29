import { FinAsset } from '@/domain/fin-asset'
import React from 'react'
import { FaArrowRight, FaEdit } from 'react-icons/fa'
import { IoIosArrowDropright } from 'react-icons/io'

type Props = {
    asset: FinAsset
    onChange?: (a: FinAsset) => void
}

export default function FinAssetItem({ asset, onChange }: Props) {

    return (
        <>
            <button className='flex p-2 rounded-md justify-between items-center cursor-pointer bg-slate-900 hover:bg-pink-800 hover:text-white 
                transition-all duration-300'>
                <div>

                    <span>{asset.name}</span>
                </div>

                <span className=''><FaEdit /></span>
            </button>
        </>
    )
}
