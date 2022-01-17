import { DropdownItemProps } from "semantic-ui-react";
import MaterialRequesition from "../../../../Models/ClassModels/MaterialRequesition";
import MaterialRequesitionFormViewModel from "../../../../Models/ViewModels/MaterialRequesitionFormViewModel";

export default interface IMaterialRequestionFormProps {
  viewModel: MaterialRequesition;
  onSubmit: () => void;
  onChange: (value: any, controlName: string) => void;
  disabled: boolean;
  departments?: DropdownItemProps[];
  errors: any;
}
