import IMaterialDropdownOption from "../../Models/InterfaceModels/IMaterialDropDownOption";
import IMaterialDropDownOption from "../../Models/InterfaceModels/IMaterialDropDownOption";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IMaterialRequistionItemBusinessLogic from "./IMaterialRequistionItemBusinessLogic";

export default class MaterialRequistionItemBusinessLogic
  implements IMaterialRequistionItemBusinessLogic
{
  private _materialItemsService: IMaterialRequisitionItemService;

  constructor() {
    this._materialItemsService = new MaterialRequisitionItemService();
  }

  async getMaterialItemsNoInPOOption(
    assigneeId: any
  ): Promise<IMaterialDropdownOption[]> {
    try {
      const items =
        await this._materialItemsService.getMaterialItemsAssignedThatIsNotInPO(
          assigneeId
        );
      if (items.length > 0) {
        return items.map((item) => {
          return {
            item: item,
            key: item.id,
            text: item.description,
          };
        });
      }
    } catch (e) {
      throw new Error(
        `error occurred while retrieving the purchasing requests lookup:${e.message}`
      );
    }
  }
}
