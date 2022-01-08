import * as React from "react";
import Compstyles from "./Forms.module.scss";
import { Icon, Button, Modal } from "office-ui-fabric-react";
import { Guid } from "@microsoft/sp-core-library";
import styles from "../CoreComponents/Componentstyles.module.scss";
import { Textarea } from "./textarea";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

interface ConfirmationProps {
  Closed?: (textAreaContent: string) => void;
  TitleMsg: string;
  Message: string;
  hidden: boolean;
  confirmValue: (textAreaContent: string) => void;
  confirmedNeedCloseAction?: () => void;
  confirmedNeedClose?: boolean;
  showTextArea?: boolean;
  textAreaLabelName?: string;
  textAreaErrorMessage?: string;
  textAreaShowToolTip?: boolean;
  textAreaToolTip?: string;
  textAreaRequired?: boolean;
  customStyle?: string;
}
interface ConfirmationStats {
  confirmMsgHide: boolean;
  dialogId: string | null;
  textAreaValue?: string;
  textAreaHasError?: boolean;
}

export class ConfirmationMessage extends React.Component<
  ConfirmationProps,
  ConfirmationStats
> {
  constructor(props) {
    super(props);
    this.state = {
      confirmMsgHide: true,
      dialogId: null,
    };
  }

  private hideModal(textAreaContent) {
    this.setState({ confirmMsgHide: true });
    this.props.Closed(textAreaContent);
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.setState({
      dialogId: `dialog-${Guid.newGuid().toString()}`,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hidden !== this.state.confirmMsgHide) {
      this.setState({ confirmMsgHide: nextProps.hidden });

      // console.log('componentWillReceiveProps');
      // console.log(this.state.confirmMsgHide);
      // console.log(nextProps.hidden);
    }
  }

  private handleInputChange = (event) => {
    const value = event;
    const name = "textAreaValue";
    this.setState({
      textAreaValue: value,
    } as Pick<ConfirmationStats, keyof ConfirmationStats>);
  };

  public render(): React.ReactElement<{}> {
    return (
      <>
        {
          // console.log('modal')
        }
        <Modal
          isOpen={!this.state.confirmMsgHide}
          onDismiss={(e) => {
            this.hideModal(this.state.textAreaValue);
          }}
          isBlocking={false}
          className={[
            Compstyles.Modal,
            "ModalSmall",
            this.props.customStyle && this.props.customStyle,
          ].join(" ")}
        >
          <div
            className={Compstyles.ModalHeader}
            style={
              this.props.confirmedNeedClose && {
                background: "#4caf50",
                display: "flex",
                alignItems: "center",
              }
            }
          >
            <h3 style={this.props.confirmedNeedClose && { color: "#fff" }}>
              {this.props.TitleMsg}
            </h3>
            {/* {this.props.confirmedNeedClose && (
              <Icon
                style={{
                  color: "#fff",
                  marginRight: "1%",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  this.props.confirmedNeedCloseAction();
                }}
                iconName="ChromeClose"
              />
            )} */}
          </div>

          <div className={Compstyles.ModalBody}>
            {this.props.confirmedNeedClose && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: "#4caf50",
                    fontSize: 48,
                    margin: "4% 0px 5%",
                  }}
                  iconName="CompletedSolid"
                />
              </div>
            )}
            <MDBCol
              md="12"
              style={
                this.props.confirmedNeedClose && {
                  textAlign: "center",
                  margin: "3% 0 4%",
                }
              }
            >
              {this.props.Message}
            </MDBCol>
            {this.props.showTextArea ? (
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="ui form">
                      <Textarea
                        Required={this.props.textAreaRequired}
                        value={this.state.textAreaValue}
                        ctrlName="textAreaValue"
                        handleInputChange={this.handleInputChange}
                        label={this.props.textAreaLabelName}
                        errorMessage={this.props.textAreaErrorMessage}
                        showError={this.state.textAreaHasError}
                        tooltip={this.props.textAreaShowToolTip}
                        maxLength={500}
                        tooltipText={this.props.textAreaToolTip}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            ) : null}
          </div>

          <div className={Compstyles.ModalFooter}>
            {!this.props.confirmedNeedClose ? (
              <>
                <Button
                  className={Compstyles.saveBtn}
                  onClick={() => {
                    if (
                      (!this.state.textAreaValue ||
                        this.state.textAreaValue == "") &&
                      this.props.showTextArea === true
                    ) {
                      this.setState({ textAreaHasError: true });
                      return;
                    }
                    this.props.confirmValue(this.state.textAreaValue);
                    this.setState((prevState) => {
                      const newState = { ...prevState };
                      newState.textAreaValue = "";
                      return newState;
                    });
                  }}
                >
                  <span>Yes</span>
                  <Icon iconName="CheckMark" />
                </Button>

                <Button
                  className={Compstyles.cancelBtn}
                  onClick={(e) => {
                    this.hideModal(this.state.textAreaValue);
                  }}
                >
                  <span>No</span>
                  <Icon iconName="Cancel" />
                </Button>
              </>
            ) : (
              <Button
                className={Compstyles.cancelBtn}
                onClick={() => this.props.confirmedNeedCloseAction()}
              >
                <span>Close</span>
              </Button>
            )}
          </div>
        </Modal>
      </>
    );
  }
}
