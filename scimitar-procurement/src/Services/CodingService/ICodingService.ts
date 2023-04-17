import MaterialRequesition from "../../Models/ClassModels/MaterialRequesition";
import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import PurchasingRequest from "../../Models/ClassModels/PurchasingRequest";

export default interface ICodingService {
  codeMR(): Promise<string>;
  codePO(): Promise<string>;
}
