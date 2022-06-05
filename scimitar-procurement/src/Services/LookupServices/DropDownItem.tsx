import { DropdownItemProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem";

export default interface DropDownItem extends DropdownItemProps{
    internalName: string;
}