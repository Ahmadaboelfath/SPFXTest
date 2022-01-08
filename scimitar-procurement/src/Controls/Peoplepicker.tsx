import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
import styles from './Forms.module.scss';


interface peoplepickerProps {
    selectedItems(items: any[]);
    context: any;
    label: string;
    showError?: Boolean;
    Required: boolean;
    errorMessage?: string;
    disabled?: boolean;
    tooltip?: Boolean;
    tooltipText?: string;
    defaultSelectedUsers?: Array<string>;
    groupName?: string;
    isMultiple?: boolean;
}


export const Peoplepicker: React.FC<peoplepickerProps> =
    (props) => {
        let requiredView: {};
        let tooltipView: {};
        if (props.Required)
            requiredView = <span className="req">*</span>;


        if (props.tooltip) 
        tooltipView=<Popup content={props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />;
         


        if (props.showError)
            return (

                <div className={"field error" + (props.disabled ? "disabledPeoplePicker" : "")}>
                    <label>{props.label}{requiredView} {tooltipView}</label>

                    <PeoplePicker
                        context={props.context}
                        personSelectionLimit={props.isMultiple ? 15: 1}
                        showtooltip={true}
                        isRequired={props.Required}
                        disabled={props.disabled}
                        selectedItems={props.selectedItems}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        ensureUser={true}
                        resolveDelay={1000}
                        defaultSelectedUsers={props.defaultSelectedUsers}
                        groupName={props.groupName}
                    />

                      <div className="validateMsg">
                        <p><Icon iconName='info' />{props.errorMessage}
                        </p>
                    </div>
                </div>);

        return (

            <div className={"field " + (props.disabled ? "disabledPeoplePicker" : "")}>

                <label>{props.label}{requiredView} {tooltipView}</label>
                <PeoplePicker
                    context={props.context}
                    personSelectionLimit={props.isMultiple ? 15: 1}
                    showtooltip={true}
                    isRequired={props.Required}
                    disabled={props.disabled}
                    selectedItems={props.selectedItems}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    ensureUser={true}
                    resolveDelay={1000}
                    defaultSelectedUsers={props.defaultSelectedUsers}
                />

            </div>);
    };
