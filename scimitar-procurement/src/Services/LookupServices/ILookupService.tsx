import { DropdownItemProps } from "semantic-ui-react";

export default interface ILookupService{
     getOptionsForSemanticDropDown: (listNames: string[])=>Promise<any>

}

