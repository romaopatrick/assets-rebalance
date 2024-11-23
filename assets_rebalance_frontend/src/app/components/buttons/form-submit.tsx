import React from 'react'
import * as Form from '@radix-ui/react-form'
type Props = {
    disabled?: boolean
    onSave?: () => void 
}
export default function FormSubmit({disabled, onSave}: Props) {
    return (
        <Form.Submit disabled={disabled} onClick={onSave}
            className="hover:bg-slate-700 bg-slate-800 py-3 w-32 rounded-md disabled:bg-slate-400 disabled:text-slate-600">
            Save
        </Form.Submit>
    )
}
