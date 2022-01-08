import IDDLOption from "./IDDLOption";

export default interface IDDLProps{
    options: any[];
    onChange: (selectedValue: any, ctrlName: string)=> void;
    selected: any;
    mappedPropNames: IDDLOption;
    disabled: boolean;
    ctrlName?: string;
    label?: string;
    required?:boolean;
    showError?: boolean;
    errorMessage?: string;
}