import * as React from "react";
import ITagPickerProps from "./ITagPickerProps";
import { Icon, TagPicker as OfficeUiTagPicker } from "office-ui-fabric-react";
import Tag from "./Components/Tag/Tag";
import styles from "../main.module.scss";
import { isEmpty } from "@microsoft/sp-lodash-subset";

export default class TagPicker extends React.Component<ITagPickerProps, any> {
  onChange(selectedItems) {
    this.props.onChange(selectedItems, this.props.controlPropName);
  }

  render(): React.ReactNode {
    return (
      <div
        className={`field ${this.props.errorMessage.trim() ? "error" : ""} `}
      >
        <label>
          {this.props.label}
          {this.props.required ? <span className="req">*</span> : null}
        </label>

        <OfficeUiTagPicker
          onChange={(items) => this.onChange(items)}
          onResolveSuggestions={(filter, selectedItems) =>
            this.props.onResolveSuggestions(filter, selectedItems)
          }
          itemLimit={this.props.multiple ? 10 : 1}
          selectedItems={this.props.selectedValue}
          disabled={this.props.disabled ? true : false}
          onRenderSuggestionsItem={(props) => <Tag tag={props} />}
          resolveDelay={
            this.props.resolveDelay ? this.props.resolveDelay : 1000
          }
        />

        {this.props.errorMessage.trim() ? (
          <div className={styles.validateMsg}>
            <p>
              <Icon iconName="info" />
              {this.props.errorMessage}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}
