# Number Input Component

## Overview

The Number Input component is a customizable input field designed to handle numeric values with various formatting options. Built using React and the `react-number-format` library, it provides features such as increment/decrement buttons, thousand separators, and support for decimal values.

## Code

typescript
import { ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useState, useRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Button } from './ui/button';
import { Input } from './ui/input';
export interface NumberInputProps
extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
stepper?: number;
thousandSeparator?: string;
placeholder?: string;
defaultValue?: number;
min?: number;
max?: number;
value?: number; // Controlled value
suffix?: string;
prefix?: string;
onValueChange?: (value: number | undefined) => void;
fixedDecimalScale?: boolean;
decimalScale?: number;
}
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
(
{
stepper,
thousandSeparator,
placeholder,
defaultValue,
min = -Infinity,
max = Infinity,
onValueChange,
fixedDecimalScale = false,
decimalScale = 0,
suffix,
prefix,
value: controlledValue,
...props
},
ref
) => {
const internalRef = useRef<HTMLInputElement>(null); // Create an internal ref
const combinedRef = ref || internalRef; // Use provided ref or internal ref
const [value, setValue] = useState<number | undefined>(
controlledValue ?? defaultValue
);
const handleIncrement = useCallback(() => {
setValue((prev) =>
prev === undefined ? stepper ?? 1 : Math.min(prev + (stepper ?? 1), max)
);
}, [stepper, max]);
const handleDecrement = useCallback(() => {
setValue((prev) =>
prev === undefined
? -(stepper ?? 1)
: Math.max(prev - (stepper ?? 1), min)
);
}, [stepper, min]);
useEffect(() => {
const handleKeyDown = (e: KeyboardEvent) => {
if (
document.activeElement ===
(combinedRef as React.RefObject<HTMLInputElement>).current
) {
if (e.key === 'ArrowUp') {
handleIncrement();
} else if (e.key === 'ArrowDown') {
handleDecrement();
}
}
};
window.addEventListener('keydown', handleKeyDown);
return () => {
window.removeEventListener('keydown', handleKeyDown);
};
}, [handleIncrement, handleDecrement, combinedRef]);
useEffect(() => {
if (controlledValue !== undefined) {
setValue(controlledValue);
}
}, [controlledValue]);
const handleChange = (values: {
value: string;
floatValue: number | undefined;
}) => {
const newValue =
values.floatValue === undefined ? undefined : values.floatValue;
setValue(newValue);
if (onValueChange) {
onValueChange(newValue);
}
};
const handleBlur = () => {
if (value !== undefined) {
if (value < min) {
setValue(min);
(ref as React.RefObject<HTMLInputElement>).current!.value =
String(min);
} else if (value > max) {
setValue(max);
(ref as React.RefObject<HTMLInputElement>).current!.value =
String(max);
}
}
};
return (

<div className="flex items-center">
<NumericFormat
value={value}
onValueChange={handleChange}
thousandSeparator={thousandSeparator}
decimalScale={decimalScale}
fixedDecimalScale={fixedDecimalScale}
allowNegative={min < 0}
valueIsNumericString
onBlur={handleBlur}
max={max}
min={min}
suffix={suffix}
prefix={prefix}
customInput={Input}
placeholder={placeholder}
className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
getInputRef={combinedRef} // Use combined ref
{...props}
/>
<div className="flex flex-col">
<Button
aria-label="Increase value"
className="px-2 h-5 rounded-l-none rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
variant="outline"
onClick={handleIncrement}
disabled={value === max}
>
<ChevronUp size={15} />
</Button>
<Button
aria-label="Decrease value"
className="px-2 h-5 rounded-l-none rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
variant="outline"
onClick={handleDecrement}
disabled={value === min}
>
<ChevronDown size={15} />
</Button>
</div>
</div>
);
}
);

## Usage

### Basic Example

typescript
import { NumberInput } from './components/number-input';
<NumberInput
placeholder="Enter number"
defaultValue={10}
/>

### With Min and Max

typescript
<NumberInput
placeholder="Enter number"
min={10}
max={100}
defaultValue={10}
/>

### With Prefix and Suffix

typescript
<NumberInput
placeholder="Amount"
prefix="$"
suffix=" USD"
defaultValue={100}
/>

### With Decimal Support

typescript
<NumberInput
placeholder="Enter decimal number"
decimalScale={2}
/>

### With Stepper

typescript
<NumberInput
placeholder="Step by 5"
stepper={5}
/>

### With Thousand Separator

typescript
<NumberInput
placeholder="Formatting"
thousandSeparator={','}
/>

## Features

- **Increment/Decrement Controls**: Easily increase or decrease the value using buttons.
- **Custom Formatting**: Supports thousand separators and decimal formatting.
- **Controlled and Uncontrolled Modes**: Can be used as a controlled or uncontrolled component.
- **Validation**: Allows setting minimum and maximum values to restrict input.
- **Prefix and Suffix**: Add custom text before or after the number.
- **Supports all React Number Format props**: Compatible with all props from the `react-number-format` library.

## Installation

To use the Number Input component, ensure you have the required dependencies:

- react-number-format
- shadcn input, button
- lucide react
