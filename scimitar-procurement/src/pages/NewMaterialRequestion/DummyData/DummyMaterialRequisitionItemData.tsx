import MaterialRequestionItem from "../../../Models/ClassModels/MaterialRequesitionItem";
import NewMaterialRequestion from "../NewMaterialRequestion";

const material1 = new MaterialRequestionItem();
material1.code = "2555666";
material1.description = "M1";
material1.id = "5";
material1.materialId = 1;
material1.order = 1;
material1.quantity = 5;
material1.unit = "Piece";

const material2 = new MaterialRequestionItem();
material2.code = "2555666";
material2.description = "M1";
material2.id = "5";
material2.materialId = 1;
material2.order = 2;
material2.quantity = 5;
material2.unit = "Piece";

const material3 = new MaterialRequestionItem();
material3.code = "2555666";
material3.description = "M1";
material3.id = "5";
material3.materialId = 1;
material3.order = 3;
material3.quantity = 5;
material3.unit = "Piece";

export const matrialItemsData: MaterialRequestionItem[] = [
  material1,
  material2,
  material3,
];
