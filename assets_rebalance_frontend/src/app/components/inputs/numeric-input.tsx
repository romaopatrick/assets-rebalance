import { extractNumbers } from '@/utils/numeric'
import React, { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    value?: number
    onChange?: (v: number) => void
}

export default function NumericInput({ ...props }: Props) {
    const { onChange, value } = props
    const handleChange = (v: string) => {
        onChange?.(Number(extractNumbers(v)))
    }

    return (
        <input {...props} onChange={v => handleChange(v.target.value)} value={value} />
    )
}
