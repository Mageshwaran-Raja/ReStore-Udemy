import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
    options: any[],
    selectedValue: string,
    onChange: (event: any) => void
}

export default function RadioButtonGroup({ options, selectedValue, onChange }: Props) {
    return (
        <FormControl component="fieldset">
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}