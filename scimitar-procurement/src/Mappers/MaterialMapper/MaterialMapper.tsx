import Material from "../../Models/ClassModels/Material";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";
import IMaterialMapper from "./IMaterialMapper";

export default class MaterialMapper implements IMaterialMapper {
  mapFromSPMaterialToMaterial(SPMaterialItem: any): Material {
    const material: Material = new Material();
    material.categoryId = SPMaterialItem.MaterialCategoryId;
    material.categoryName = SPMaterialItem.MaterialCategory.Title;
    material.code = SPMaterialItem.Code;
    material.description = SPMaterialItem.Title;
    material.id = SPMaterialItem.Id;

    return material;
  }

  mapFromSPMaterialToIMaterialTag(SPMaterialItem: any): IMaterialTag {
    return {
      name: SPMaterialItem.Title,
      key: SPMaterialItem.Code,
      materialId: SPMaterialItem.Id,
    };
  }

  mapFromMaterialToSPMaterial(material: any) {
    throw new Error("Method not implemented.");
  }
}
