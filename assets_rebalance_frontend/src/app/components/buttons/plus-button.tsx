import React from 'react'
type Props = {
  onClick?: () => void
  entity: string
}

export default function PlusButton({ onClick, entity: text }: Props) {
  return (
    <div className='absolute flex text-slate-100 hover:bg-green-700 bg-slate-800 w-20 h-14 items-center justify-center right-0 bottom-0 m-5
      rounded-md transition-all duration-300 cursor-pointer
      flex-col
    '
      onClick={onClick}>
      <span className='text-xs'>New</span>
      <span>{text}</span>
    </div>
  )
}
