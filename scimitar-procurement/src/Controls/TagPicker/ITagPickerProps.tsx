import { ITag } from "office-ui-fabric-react";

export default interface ITagPickerProps {
  controlPropName: string;
  multiple: boolean;
  label: string;
  errorMessage: string;
  onResolveSuggestions: (filter, selectedItem) => ITag[] | PromiseLike<ITag[]>;
  onChange: (selectedItem: ITag[], controlPropName: string) => void;
  selectedValue?: ITag[];
  required?: boolean;
  disabled?: boolean;
  resolveDelay?: number; // provided in miliseconds
}
