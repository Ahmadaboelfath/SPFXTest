import Material from "../../Models/ClassModels/Material";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";

export default interface IMaterialMapper {
  mapFromSPMaterialToMaterial(SPMaterialItem: any): Material;
  mapFromMaterialToSPMaterial(material: any): any;
  mapFromSPMaterialToIMaterialTag(SPMaterialItem: any): IMaterialTag;
}
