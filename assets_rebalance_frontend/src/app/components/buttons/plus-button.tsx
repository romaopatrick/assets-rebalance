import React from 'react'
type Props = {
  onClick?: () => void
}

export default function PlusButton({ onClick }: Props) {
  return (
    <button className='absolute flex text-slate-100 hover:bg-slate-700 bg-slate-800 w-14 h-14 items-center justify-center right-0 bottom-0 m-5
      rounded-md transition-all duration-300
    '
      onClick={onClick}>
      +
    </button>
  )
}
