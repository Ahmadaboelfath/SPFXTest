import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import MaterialRequesitionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import MaterialRequesitionFormViewModel from "../../Models/ViewModels/MaterialRequesitionFormViewModel";
import IMaterialRequisitionMapper from "./IMaterialRequesitionMapper";

export default class MaterialRequisitionMapper
  implements IMaterialRequisitionMapper
{
  mapFromSPMaterialRequisitionToMaterialRequesition(
    SPMaterialRequisitionItem: any
  ): MaterialRequesition {
    const materialRequisition: MaterialRequesition = new MaterialRequesition(
      SPMaterialRequisitionItem.Id,
      SPMaterialRequisitionItem.RequestDate
    );

    materialRequisition.currency = SPMaterialRequisitionItem.Currency;
    materialRequisition.department = SPMaterialRequisitionItem.Department;
    materialRequisition.priority = SPMaterialRequisitionItem.Priority;
    materialRequisition.requestedBy = SPMaterialRequisitionItem.RequestedBy;
    materialRequisition.useFor = SPMaterialRequisitionItem.UseFor;
    materialRequisition.requestCode = SPMaterialRequisitionItem.Title;
    materialRequisition.status = SPMaterialRequisitionItem.Status;
    materialRequisition.requesterEmail =
      SPMaterialRequisitionItem.RequesterEmail;
    materialRequisition.leadTime = new Date(SPMaterialRequisitionItem.LeadTime);
    materialRequisition.budget = SPMaterialRequisitionItem.Budget;
    materialRequisition.contingencyPlan =
      SPMaterialRequisitionItem.ContingencyPlan;
    materialRequisition.supplier = SPMaterialRequisitionItem.Supplier;
    materialRequisition.delayConsequences =
      SPMaterialRequisitionItem.DelayConsequences;
    materialRequisition.itemStatus = SPMaterialRequisitionItem.ItemsStatus;
    materialRequisition.requestType = SPMaterialRequisitionItem.RequestType;

    return materialRequisition;
  }
  mapFromMaterialRequesitionToSPMaterialRequisition(
    materialRequsition: MaterialRequesition,
    requestType: string
  ) {
    return {
      Title: materialRequsition.requestCode,
      RequestedBy: materialRequsition.requestedBy,
      RequestDate: materialRequsition.requestDate,
      UseFor: materialRequsition.useFor,
      Department: materialRequsition.department,
      Priority: materialRequsition.priority,
      Currency: materialRequsition.currency,
      Status: materialRequsition.status,
      RequesterEmail: materialRequsition.requesterEmail,
      RequestType: requestType,
      LeadTime: materialRequsition.leadTime,
      Supplier: materialRequsition.supplier,
      ContingencyPlan: materialRequsition.contingencyPlan,
      DelayConsequences: materialRequsition.delayConsequences,
      Budget: materialRequsition.budget,
      ItemsStatus: materialRequsition.itemStatus,
    };
  }
}
