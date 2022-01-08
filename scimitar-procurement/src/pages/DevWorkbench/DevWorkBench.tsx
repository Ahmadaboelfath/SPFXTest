import * as React from "react";
import IDevWorkBenchProps from "./IDevWorkBenchProps";
import IDevWorkBenchState from "./IDevWorkBenchState";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITag } from "office-ui-fabric-react";
import IMaterialService from "../../Services/MaterialService/IMaterialService";
import MaterialService from "../../Services/MaterialService/MaterialService";
import Tag from "../../Controls/TagPicker/Components/Tag/Tag";
import IMaterialTag from "../../Models/InterfaceModels/IMaterialTag";
import { TableList } from "../../CoreComponents/Grid/TableList";
import Toggle from "../../Controls/Toggle/Toggle";
import TagPicker from "../../Controls/TagPicker/TagPicker";

class DevWorkBench extends React.Component<
  RouteComponentProps<IDevWorkBenchProps>,
  IDevWorkBenchState
> {
  private readonly _materialService: IMaterialService;

  constructor(props) {
    super(props);
    this._materialService = new MaterialService();
    this.state = {
      serachByCode: true,
    };
  }
  render(): React.ReactNode {
    return (
      <div className="ui container">
        <div className="ui middle aligned grid">
          <div className="column">
            <h2 className="ui teal header aligned center">
              <div className="content">Material Requestion</div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <Toggle
                  activeText="Description"
                  inactiveText="Code"
                  label="Search Type"
                  disabled={false}
                  controlPropName=""
                  onChange={() => this.toggleSearchPicker()}
                />
                <TagPicker
                  errorMessage=" "
                  label={
                    this.state.serachByCode
                      ? "Material Code"
                      : "Material Description"
                  }
                  multiple={false}
                  controlPropName=""
                  onChange={(selectedItems) => console.log(selectedItems)}
                  onResolveSuggestions={
                    this.state.serachByCode
                      ? (filter, selectedItem) =>
                          this.onCodeSearch(filter, selectedItem)
                      : (filter, selectedItem) =>
                          this.onDescriptionSearch(filter, selectedItem)
                  }
                />
                <TableList
                  onDelete={() => console.log("Delete")}
                  onSubmit={() => console.log("Submit")}
                  registrations={[]}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  toggleSearchPicker(): void {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.serachByCode = !prevState.serachByCode;
      return newState;
    });
  }
  onCodeSearch(
    filter: string,
    selectedItem: ITag[]
  ): ITag[] | PromiseLike<ITag[]> {
    return this._materialService.searchMaterialByCode(filter);
  }

  onDescriptionSearch(
    filter: string,
    selectedItem: ITag[]
  ): ITag[] | PromiseLike<ITag[]> {
    return this._materialService.searchMaterialByDescription(filter);
  }
}

export default withRouter(DevWorkBench);
