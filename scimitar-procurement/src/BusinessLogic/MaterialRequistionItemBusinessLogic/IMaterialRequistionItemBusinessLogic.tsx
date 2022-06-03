import IMaterialDropdownOption from "../../Models/InterfaceModels/IMaterialDropDownOption";

export default interface IMaterialRequistionItemBusinessLogic {
  getMaterialItemsNoInPOOption(assigneeId): Promise<IMaterialDropdownOption[]>;
}
