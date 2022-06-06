import PurchasingOrder from "../../Models/ClassModels/PurchasingOrder";
import IPurchaseOrderMapper from "./IPurchaseOrderMapper";

export default class PurchaseOrderMapper implements IPurchaseOrderMapper {
  mapFromSPListItemObject(spObject: any): PurchasingOrder {
    const purchaseOrder: PurchasingOrder = new PurchasingOrder();
    purchaseOrder.title = spObject.Title;
    purchaseOrder.vendorId = spObject.VendorId;
    purchaseOrder.shipToId = spObject.ShipToId;
    purchaseOrder.requesitioner = spObject.Requisitioner;
    purchaseOrder.shipMethodId = spObject.ShipMethodId;
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
    purchaseOrder.statusId = spObject.StatusId;
    purchaseOrder.id = spObject.Id;
    purchaseOrder.shipToTitle = spObject.ShipTo ? spObject.ShipTo.Title : "";
    purchaseOrder.shipMethodTitle = spObject.ShipMethod
      ? spObject.ShipMethod.Title
      : "";
    purchaseOrder.vendorTitle = spObject.Vendor ? spObject.Vendor.Title : "";
    purchaseOrder.statusTitle = spObject.Status ? spObject.Status.Title : "";
    purchaseOrder.estimatedDelivery = spObject.EstimatedDelivery
      ? new Date(spObject.EstimatedDelivery)
      : null;

    return purchaseOrder;
  }
  mapToSPListItemObject(purchaseOrder: PurchasingOrder) {
    const spObject = {
      Title: purchaseOrder.title,
      VendorId: purchaseOrder.vendorId,
      ShipToId: purchaseOrder.shipToId,
      Requisitioner: purchaseOrder.requesitioner,
      ShipMethodId: purchaseOrder.shipMethodId,
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
      StatusId: purchaseOrder.statusId,
      EstimatedDelivery: purchaseOrder.estimatedDelivery,
    };
    return spObject;
  }
}
