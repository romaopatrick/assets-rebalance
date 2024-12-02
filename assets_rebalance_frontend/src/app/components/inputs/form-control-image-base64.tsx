import React from 'react'
import * as Form from '@radix-ui/react-form'
import { FileInputButton } from '@files-ui/react'
import Image from 'next/image'

type Props = {
    base64?: string
    onChange?: (base64: string) => void
}
export default function FormControlImageBase64({ base64, onChange }: Props) {
    const handleChange = async (file: File | null) => {
        if (!file) {
            console.error("empty file")
            return
        }

        const b = await fileToBase64(file)
        if (!b) {
            console.error("fileToBase64 failed", b)
            return
        }

        onChange?.(b)
    }
    function fileToBase64(blob: File) {
        return new Promise<string>((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    }
    return (
        <div className='flex h-full gap-4'>
            <Form.Control asChild>
                <FileInputButton
                    maxFileSize={10000000}
                    maxFiles={1}
                    onChange={(e) => e?.[0]?.file && handleChange(e?.[0]?.file)}
                />
            </Form.Control>
            {base64 && <Image height={40} alt='base64 selected' className='w-10 bg-slate-200 rounded-md' src={`${base64}`} />}
        </div>
    )
}
