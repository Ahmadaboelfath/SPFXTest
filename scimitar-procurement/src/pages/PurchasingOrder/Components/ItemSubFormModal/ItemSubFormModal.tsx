import { DefaultButton, IconButton, Modal } from "office-ui-fabric-react";
import * as React from "react";
import ItemSubFormModalProps from "./ItemSubFormModalProps";
import styles from "../../../../CoreComponents/Componentstyles.module.scss";
import ItemSubForm from "../ItemSubForm/ItemSubForm";

export default class ItemSubFormModal extends React.Component<
  ItemSubFormModalProps,
  any
> {
  render(): React.ReactNode {
    return (
      <Modal
        titleAriaId="AddItems"
        isOpen={this.props.show}
        onDismiss={() => this.props.onDialogDismiss()}
        isBlocking={false}
        className={styles.Modal}
      >
        <div className={styles.Modalheader}>
          <h3>Add Material Item</h3>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={() => this.props.onDialogDismiss()}
          />
        </div>

        <div className={styles.Modalbody}>{this.props.component}</div>
        <div className="Modalfooter">
          <div className="buttonBlock">
            <DefaultButton
              onClick={() => this.props.onSubmitAction()}
              // className="saveBtn"
            >
              <span>Submit</span>
            </DefaultButton>
            <DefaultButton
              onClick={() => this.props.onDialogDismiss()}
              // className="cancelBtn"
            >
              <span>Cancel</span>
            </DefaultButton>
          </div>
        </div>
      </Modal>
    );
  }
}
