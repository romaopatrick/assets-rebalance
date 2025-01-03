'use client'

import { useState, useEffect } from "react";
import { InputProps } from "react-select";

type Props = {
    id?: string
    value: number;
    onChange?: (n: number) => void;
    addonBefore?: string;
    inputClassName?: string
    className?: string
    inputProps?: Partial<InputProps>
} 

const DECIMAL_SIZE = 2;

const MoneyInput = ({ value, onChange, addonBefore = 'R$', ...props }: Props) => {
    const [currentValue, setCurrentValue] = useState<string>(`${value}`);

    useEffect(() => {
        const valueString = `${value}`;

        if (!/\D/.test(valueString.replace('.', ''))) {
            setCurrentValue(value.toFixed(DECIMAL_SIZE).toString());
        }
    }, [value]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueRemoved = event.target.value.replace('.', '');

        const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
        const newValue = [valueRemoved.slice(0, sizeSlice), '.', valueRemoved.slice(sizeSlice)].join(
            '');

        onChange?.(Number(newValue));
    };

    return (
        <div className={"flex gap-2 w-fit items-center " + props.className}>
            <span>{addonBefore}</span>
            <input id={props.id} maxLength={9} className={"px-1 max-w-[130px] rounded-sm outline-none " + props.inputClassName} value={Number(currentValue).toFixed(2)} onChange={handleOnChange} {...props.inputProps} />
        </div>
    );
};

export default MoneyInput;