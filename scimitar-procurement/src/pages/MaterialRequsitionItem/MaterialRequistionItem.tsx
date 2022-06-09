import { values } from "lodash";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import {
  Button,
  DefaultButton,
  IconButton,
  Modal,
} from "office-ui-fabric-react";
import * as React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { DropdownItemProps, DropdownProps } from "semantic-ui-react";
import { BannerComponent } from "../../CoreComponents/Banner";
import { LoadingBoxComponent } from "../../CoreComponents/LodingBox";
import MaterialRequestionItem from "../../Models/ClassModels/MaterialRequesitionItem";
import ChoiceService from "../../Services/ChoicesService/ChoiceService";
import IChoiceService from "../../Services/ChoicesService/IChoiceService";
import IMaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/IMaterialRequisitionItemService";
import MaterialRequisitionItemService from "../../Services/MaterialRequesitionItem/MaterialRequisitionItemService";
import MaterialRequsitionItemForm from "./Component/MaterialRequistionForm/MaterialRequisitionForm";
import { IItemPropData } from "./HelperInterfaces";
import IMaterialRequistionItemProps from "./IMaterialRequistionItemProps";
import IMaterialRequistionItemState from "./IMaterialRequistionItemState";
import { ViewMode } from "./ViewMode";

class MaterialRequistionItem extends React.Component<
  IMaterialRequistionItemProps,
  IMaterialRequistionItemState
> {
  private readonly _materialRequistionService: IMaterialRequisitionItemService;
  private readonly _choiceService: IChoiceService;

  constructor(props) {
    super(props);
    this._materialRequistionService = new MaterialRequisitionItemService();
    this._choiceService = new ChoiceService();
    this.state = {
      item: new MaterialRequestionItem(),
      showSpinner: true,
      statusOptions: [],
      showDialog: false,
      dialogMessage: "",
      dialogTitle: "",
      dialogConfirmationAction: null,
      showFinalConfirmationDialog: false,
      currencyOptions: [],
    };
  }

  componentDidMount(): void {
    const id = this.props.match.params["id"];
    if (this.props.viewMode === ViewMode.Edit) {
      this._materialRequistionService
        .getMaterialRequistionById(id)
        .then((item) => {
          console.log(item);
          if (item.POId === null) {
            this.setState((prevState) => {
              const newState = { ...prevState };
              // newState.showSpinner = false;
              newState.item = item;
              return newState;
            });
          } else {
            this.setState((prevState) => {
              const newState = { ...prevState };
              newState.item = item;
              newState.showFinalConfirmationDialog = true;
              newState.dialogMessage =
                "Cannot edit this item because it is already in a purchase order";
              newState.dialogConfirmationAction = () =>
                this.props.history.push("/");
              return newState;
            });
          }
        })
        .then(() => {
          this.loadChoices();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      this._materialRequistionService
        .getMaterialRequistionById(id)
        .then((item) => {
          console.log(item);
          this.setState((prevState) => {
            const newState = { ...prevState };
            newState.showSpinner = false;
            newState.item = item;
            return newState;
          });
        })
        .catch((e) => console.error(e));
    }
  }

  loadChoices() {
    this._choiceService
      .getChoicesFromChoiceField("MaterialRequisitionItems", "Status")
      .then((data) => {
        this._choiceService
          .getChoicesFromChoiceField("MaterialRequisitionItems", "Currency")
          .then((currency) => {
            const options: DropdownItemProps[] = data.map((value) => ({
              text: value,
              value: value,
            }));

            const currencyOptions: DropdownItemProps[] = currency.map(
              (value) => ({
                text: value,
                value: value,
              })
            );

            this.setState((prevState) => {
              const newState = { ...prevState };
              newState.statusOptions = options;
              newState.showSpinner = false;
              newState.currencyOptions = currencyOptions;
              return newState;
            });
          });
      })
      .catch((e) => console.error(e, "Failed to load choices for the Status"));
  }

  componentDidUpdate(
    prevProps: Readonly<IMaterialRequistionItemProps>,
    prevState: Readonly<IMaterialRequistionItemState>,
    snapshot?: any
  ): void {
    if (
      prevProps.viewMode === ViewMode.View &&
      this.props.viewMode === ViewMode.Edit
    ) {
      this.loadChoices();
    }
  }

  changeItemState(itemsProps: IItemPropData[]) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      itemsProps.forEach((itemProp) => {
        newState.item[itemProp.propName] = itemProp.value;
      });
      return newState;
    });
  }

  onChange(value, ctrlName) {
    switch (ctrlName) {
      case "unitPrice":
        const price = value ? value : 0;
        const propsToBeChanged: IItemPropData[] = [
          {
            propName: "unitPrice",
            value: price,
          },
          {
            propName: "totalPrice",
            value: price ? parseFloat(price) * this.state.item.quantity : 0,
          },
        ];

        this.changeItemState(propsToBeChanged);
        break;
      default:
        this.changeItemState([
          {
            propName: ctrlName,
            value: value,
          },
        ]);
        break;
    }
  }

  onDialogDismiss(): any {
    this.updateState([{ propName: "showDialog", value: false }]);
  }

  renderDialog(): JSX.Element {
    return (
      <Modal
        titleAriaId="Success"
        isOpen={this.state.showDialog}
        onDismiss={() => this.onDialogDismiss()}
        isBlocking={false}
        className="Modal"
      >
        <div className="Modalheader">
          <h3>{this.state.dialogTitle}</h3>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={() => this.onDialogDismiss()}
          />
        </div>

        <div className="Modalbody">{this.state.dialogMessage}</div>

        <div className="Modalfooter">
          {this.state.showDialog && !this.state.showFinalConfirmationDialog ? (
            <div className="buttonBlock">
              <DefaultButton
                // className="saveBtn"
                onClick={() => this.state.dialogConfirmationAction()}
              >
                Confirm
              </DefaultButton>
              <DefaultButton
                // className="cancelBtn"
                onClick={() => this.onDialogDismiss()}
              >
                Cancel
              </DefaultButton>
            </div>
          ) : (
            <div className="buttonBlock">
              <DefaultButton
                // className="saveBtn"
                onClick={() => this.state.dialogConfirmationAction()}
              >
                Confirm
              </DefaultButton>
            </div>
          )}
        </div>
      </Modal>
    );
  }

  updateState(propsToBeChanged: IItemPropData[]) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      propsToBeChanged.forEach((prop: IItemPropData) => {
        newState[prop.propName] = prop.value;
      });
      return newState;
    });
  }

  renderActionButtons() {
    switch (this.props.viewMode) {
      case ViewMode.View:
        return (
          <div className="button block">
            {this.state.item.POId === null ? (
              <Button
                text="Edit"
                onClick={() => {
                  this.updateState([{ propName: "showSpinner", value: true }]);
                  this.props.history.push(
                    `/MaterialItem/edit/${this.state.item.id}`
                  );
                }}
              />
            ) : null}

            <Button
              text="Cancel"
              onClick={() => this.props.history.push("/AssignedItems")}
            />
          </div>
        );

      case ViewMode.Edit:
        return (
          <div className="button block">
            {this.state.item.POId === null ? (
              <Button text="Submit" onClick={() => this.onSubmitClick()} />
            ) : null}
            <Button
              text="Cancel"
              onClick={() => this.props.history.push("/AssignedItems")}
            />
          </div>
        );
    }
  }
  onSubmitClick(): void {
    const propsForStateUpdate: IItemPropData[] = [
      {
        propName: "showDialog",
        value: true,
      },
      {
        propName: "dialogMessage",
        value: "Are you sure you want to update this item?",
      },
      {
        propName: "dialogTitle",
        value: "Update Item",
      },
      {
        propName: "dialogConfirmationAction",
        value: () => this.submit(),
      },
    ];

    this.updateState(propsForStateUpdate);
  }
  submit() {
    const propsForStateUpdate: IItemPropData[] = [
      {
        propName: "showDialog",
        value: false,
      },
      {
        propName: "showSpinner",
        value: true,
      },
    ];

    this.updateState(propsForStateUpdate);

    this._materialRequistionService
      .updateItem(this.state.item)
      .then((item) => {
        const propsForStateUpdate: IItemPropData[] = [
          {
            propName: "showDialog",
            value: true,
          },
          {
            propName: "showFinalConfirmationDialog",
            value: true,
          },
          {
            propName: "showSpinner",
            value: false,
          },
          {
            propName: "dialogMessage",
            value: "Item updated successfully",
          },
          {
            propName: "dialogTitle",
            value: "Success",
          },
          {
            propName: "dialogConfirmationAction",
            value: () => this.props.history.push("/AssignedItems"),
          },
          {
            propName: "item",
            value: item,
          },
        ];

        this.updateState(propsForStateUpdate);
      })
      .catch((e) => {
        const propsForStateUpdate: IItemPropData[] = [
          {
            propName: "showDialog",
            value: true,
          },
          {
            propName: "showSpinner",
            value: false,
          },
          {
            propName: "dialogMessage",
            value: "Error occurred",
          },
          {
            propName: "dialogTitle",
            value: "Error",
          },
          {
            propName: "dialogConfirmationAction",
            value: () => this.onDialogDismiss(),
          },
        ];

        this.updateState(propsForStateUpdate);
      });
  }

  render(): React.ReactNode {
    return (
      <>
        {this.state.showSpinner ? (
          <LoadingBoxComponent />
        ) : (
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <BannerComponent
                  PageTitle={`View Material: ${this.state.item.id}`}
                />
                <MaterialRequsitionItemForm
                  item={this.state.item}
                  viewMode={this.props.viewMode}
                  statusOptions={this.state.statusOptions}
                  onChange={(value, ctrlName) => this.onChange(value, ctrlName)}
                  currencyOptions={this.state.currencyOptions}
                />

                {this.renderActionButtons()}
                {this.state.showDialog ? this.renderDialog() : null}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </>
    );
  }
}

export default withRouter(MaterialRequistionItem);
