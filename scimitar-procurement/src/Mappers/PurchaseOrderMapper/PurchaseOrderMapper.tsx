import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseOrderMapper from "./IPurchaseOrderMapper";

export default class PurchaseOrderMapper implements IPurchaseOrderMapper {
  mapFromSPListItemObject(spObject: any): PurchasingOrder {
    const purchaseOrder: PurchasingOrder = new PurchasingOrder();
    purchaseOrder.title = spObject.Title;
    purchaseOrder.vendorId = spObject.VendorId;
    purchaseOrder.shipToId = spObject.ShipToId;
    purchaseOrder.requesitioner = spObject.Requisitioner;
    purchaseOrder.shipMethod = spObject.ShipMethod;
    purchaseOrder.incoTerms = spObject.IncoTerms;
    purchaseOrder.deliveryTerms = spObject.DeliveryTerms;
    purchaseOrder.paymentTerms = spObject.PaymentTerms;
    purchaseOrder.partialShipment = spObject.PartialShipment;
    purchaseOrder.subTotal = isNaN(parseFloat(spObject.SubTotal))
      ? 0
      : parseFloat(spObject.SubTotal);
    purchaseOrder.discountPercentage = isNaN(
      parseFloat(spObject.DiscountPercentage)
    )
      ? 0
      : parseFloat(spObject.DiscountPercentage);
    purchaseOrder.discountAmount = isNaN(parseFloat(spObject.DiscountAmount))
      ? 0
      : parseFloat(spObject.DiscountAmount);
    purchaseOrder.shipAndHandling = isNaN(parseFloat(spObject.ShipAndHandling))
      ? 0
      : parseFloat(spObject.ShipAndHandling);
    purchaseOrder.freightCharge = isNaN(parseFloat(spObject.FreightCharge))
      ? 0
      : parseFloat(spObject.FreightCharge);
    purchaseOrder.grandTotal = isNaN(parseFloat(spObject.GrandTotal))
      ? 0
      : parseFloat(spObject.GrandTotal);
    purchaseOrder.vendorAttention = spObject.VendorAttention;
    purchaseOrder.vendorEmail = spObject.VendorEmail;
    purchaseOrder.requestorId = spObject.RequestorId;
    purchaseOrder.requestorEmail = spObject.Requestor
      ? spObject.Requestor.EMail
      : "";
    purchaseOrder.status = spObject.Status;
    purchaseOrder.id = spObject.Id;
    return purchaseOrder;
  }
  mapToSPListItemObject(purchaseOrder: PurchasingOrder) {
    const spObject = {
      Title: purchaseOrder.title,
      VendorId: purchaseOrder.vendorId,
      ShipToId: purchaseOrder.shipToId,
      Requisitioner: purchaseOrder.requesitioner,
      ShipMethod: purchaseOrder.shipMethod,
      IncoTerms: purchaseOrder.incoTerms,
      DeliveryTerms: purchaseOrder.deliveryTerms,
      PaymentTerms: purchaseOrder.paymentTerms,
      PartialShipment: purchaseOrder.partialShipment,
      SubTotal: purchaseOrder.subTotal,
      DiscountPercentage: purchaseOrder.discountPercentage,
      DiscountAmount: purchaseOrder.discountAmount,
      ShipAndHandling: purchaseOrder.shipAndHandling,
      FreightCharge: purchaseOrder.freightCharge,
      GrandTotal: purchaseOrder.grandTotal,
      VendorAttention: purchaseOrder.vendorAttention,
      VendorEmail: purchaseOrder.vendorEmail,
      RequestorId: purchaseOrder.requestorId,
      Status: purchaseOrder.status,
    };
    return spObject;
  }
}
