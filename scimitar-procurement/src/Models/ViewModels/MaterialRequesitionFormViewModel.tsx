import MaterialRequesition from "../ClassModels/MaterialRequesition";
import MaterialRequestionItem from "../ClassModels/MaterialRequesitionItem";
import MaterialRequesitionItem from "../ClassModels/MaterialRequesitionItem";

export default class MaterialRequesitionFormViewModel {
  constructor(
    materialRequesition?: MaterialRequesition,
    materialRequesitionItems?: MaterialRequestionItem[]
  ) {
    this._materialItems = materialRequesitionItems
      ? materialRequesitionItems
      : [];

    this._materialRequesition = materialRequesition
      ? materialRequesition
      : new MaterialRequesition();
  }

  private _materialRequesition: MaterialRequesition;
  public get materialRequesition(): MaterialRequesition {
    return this._materialRequesition;
  }
  public set materialRequesition(v: MaterialRequesition) {
    this._materialRequesition = v;
  }

  private _materialItems: MaterialRequesitionItem[];
  public get materialItems(): MaterialRequesitionItem[] {
    return this._materialItems;
  }
  public set materialItems(v: MaterialRequesitionItem[]) {
    this._materialItems = v;
  }
}
