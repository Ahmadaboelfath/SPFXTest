import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import IMaterialRequesitionService from "../../Services/MaterialRequesitionService/IMaterialRequesitionService";
import MaterialRequesitionService from "../../Services/MaterialRequesitionService/MaterialRequesitionService";
import IMaterialRequesitionBusinessLogic from "./IMaterialRequesitionBusinessLogic";

export default class MaterialRequesitionBusinessLogic
  implements IMaterialRequesitionBusinessLogic
{
  private readonly _materialRequesitionService: IMaterialRequesitionService;
  private readonly _materialRequesitionItemService: IMaterialRequisitionItemService;

  /**
   *
   */
  constructor() {
    this._materialRequesitionItemService = new MaterialRequisitionItemService();
    this._materialRequesitionService = new MaterialRequesitionService();
  }
  async addMR(
    materialRequesitionFormViewModel: MaterialRequesitionFormViewModel
  ): Promise<MaterialRequesitionFormViewModel> {
    const addedRequisition = await this._materialRequesitionService.addRequest(
      materialRequesitionFormViewModel.materialRequesition,
      "MR"
    );

    const generatedRequestCode =
      await this._materialRequesitionService.generateRequestCode(
        addedRequisition.id
      );

    const itemsAdded = await Promise.all(
      materialRequesitionFormViewModel.materialItems.map(async (item) => {
        item.materialRequisitionId = addedRequisition.id;
        const addedItem =
          await this._materialRequesitionItemService.addMaterialRequesitionItem(
            item
          );

        return addedItem;
      })
    );

    const updatedModel = new MaterialRequesitionFormViewModel();
    addedRequisition.requestCode = generatedRequestCode;
    updatedModel.materialItems = itemsAdded;
    updatedModel.materialRequesition = addedRequisition;

    return updatedModel;
  }
  async addSR(
    materialRequesitionFormViewModel: MaterialRequesitionFormViewModel
  ): Promise<MaterialRequesitionFormViewModel> {
    const addedRequisition = await this._materialRequesitionService.addRequest(
      materialRequesitionFormViewModel.materialRequesition,
      "SR"
    );

    const generatedRequestCode =
      await this._materialRequesitionService.generateRequestCode(
        addedRequisition.id
      );

    const itemsAdded = await Promise.all(
      materialRequesitionFormViewModel.materialItems.map(async (item) => {
        item.materialRequisitionId = addedRequisition.id;
        const addedItem =
          await this._materialRequesitionItemService.addMaterialRequesitionItem(
            item
          );

        return addedItem;
      })
    );

    const updatedModel = new MaterialRequesitionFormViewModel();
    addedRequisition.requestCode = generatedRequestCode;
    updatedModel.materialItems = itemsAdded;
    updatedModel.materialRequesition = addedRequisition;

    return updatedModel;
  }
  async getMaterialRequisitionById(
    id: number
  ): Promise<MaterialRequesitionFormViewModel> {
    const materialRequesition =
      await this._materialRequesitionService.getMaterialRequesitionById(id);
    const materialItems =
      await this._materialRequesitionItemService.getMaterialRequesitionItemsByRequesitionId(
        id
      );
    const viewModel = new MaterialRequesitionFormViewModel();
    viewModel.materialItems = materialItems;
    viewModel.materialRequesition = materialRequesition;
    return viewModel;
  }
}
