import { extractNumbers } from '@/utils/numeric'
import * as Form from '@radix-ui/react-form'
import React from 'react'
type Props = Form.FormControlProps & {
    className: string,
    value: string,
    onChange: (v: string) => void
}
export default function FormControlNumeric(
    props: Props
) {
    const { onChange } = props
    const handleChange = (v: string) => {
        onChange(extractNumbers(v))
    }

    return (
        <Form.Control
            {...props}
            onChange={(e) => handleChange(e.target.value)} />
    )
}
