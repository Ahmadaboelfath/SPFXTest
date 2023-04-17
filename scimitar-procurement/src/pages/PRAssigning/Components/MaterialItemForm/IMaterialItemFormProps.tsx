import { IBasePickerSuggestionsProps, ITag } from "office-ui-fabric-react";
import MaterialRequestionItem from "../../../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialItemFormProps {
  viewModel: MaterialRequestionItem;
  onSearch: (filter, selectedItem) => ITag[] | PromiseLike<ITag[]>;
  toggleSearchPicker: () => void;
  onChange: (value, controlName) => void;
  onSubmit: () => void;
  count: string;
  searchByCode: boolean;
  isInEditForm: boolean;
  tagPickerSuggesstionProps: IBasePickerSuggestionsProps;
  singleAssignee: boolean;
}
