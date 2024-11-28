import React from 'react'
type Props = {
    changed?: boolean
    loading?: boolean
    valid?: boolean

    onReset: () => void
    onSave: () => void
}
export default function SaveBottomBar({ changed, loading, valid, onReset, onSave }: Props) {
    return !changed ? <></> : (
        <div className='flex absolute w-[88%] bottom-0 items-center justify-center h-16' >
            <div className='flex flex-1  mx-40 rounded-t-md justify-between bg-slate-700 h-full'>
                <button disabled={loading}
                    onClick={onReset}
                    className={`bg-slate-800 transition-all duration-200 w-40 
                    rounded-md m-2 hover:bg-slate-900 
                    ${loading && 'text-slate-500 hover:bg-slate-800 cursor-default'}`}>Reset</button>
                <button disabled={loading || !valid} 
                    onClick={onSave}
                    className={`bg-pink-700 hover:bg-pink-600 transition-all 
                    duration-200 w-40 rounded-md m-2 
                     ${loading || !valid && 'text-slate-500 bg-slate-800 hover:bg-slate-800 cursor-default'}`}>Save</button>
            </div>
        </div>
    )
}
