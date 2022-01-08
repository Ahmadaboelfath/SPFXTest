import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
import styles from './Forms.module.scss';

interface textareaProps {
    value: string;
    handleInputChange(event);
    ctrlName: string;
    label: string;
    showError?: Boolean;
    Required: boolean;
    errorMessage?: string;
    tooltip?: Boolean;
    tooltipText?: string;
    disabled?: boolean;
    showPlaceholder?: boolean;
    Inputid?:any;
}


export const Textarea: React.FC<textareaProps> =

(props) => {
    let requiredView: {};
    let tooltipView: {};
    if (props.Required)
        requiredView = <span className="req">*</span>;

    if (props.tooltip) 
        tooltipView=<Popup content={props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />;


    if (props.showError)
        return (

            <div className="field error">

                <label>{props.label}{requiredView}</label>
                <textarea id={props.Inputid}  name={props.ctrlName} value={props.value} className="txtarea-plchldr" required={props.Required} 
                onChange={props.handleInputChange} disabled={props.disabled}>{props.value}</textarea>

                  <div className="validateMsg">
                    <p><Icon iconName='info' />{props.errorMessage}
                    </p>
                </div>
            </div>);

    return (

        <div className="field ">

            <label>{props.label}{requiredView} {tooltipView}</label>
            <textarea id={props.Inputid} name={props.ctrlName} value={props.value} className="txtarea-plchldr" 
            required={props.Required} onChange={props.handleInputChange} disabled={props.disabled}>{props.value}</textarea>
        </div>);
};

