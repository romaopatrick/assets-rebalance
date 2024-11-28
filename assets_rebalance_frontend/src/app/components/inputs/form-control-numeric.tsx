import { extractNumbers } from '@/utils/numeric'
import * as Form from '@radix-ui/react-form'
import React from 'react'
type Props = Form.FormControlProps & {
    className?: string,
    value: number,
    onChange: (v: number) => void
}
export default function FormControlNumeric(
    props: Props
) {
    const { onChange } = props
    const handleChange = (v: string) => {
        onChange(Number(extractNumbers(v)))
    }

    return (
        <Form.Control
            {...props}
            onChange={(e) => handleChange(e.target.value)} />
    )
}
