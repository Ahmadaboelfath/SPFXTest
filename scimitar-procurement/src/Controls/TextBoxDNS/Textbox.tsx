import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';

interface textboxProps {
    value: string;
    handleInputChange(value, ctrlName);
    ctrlName: string;
    label: string;
    showError?: Boolean;
    Required: boolean;
    errorMessage?: string;
    tooltip?: Boolean;
    tooltipText?: string| JSX.Element;
    disabled?: boolean;
    showPlaceholder?: boolean;
    Inputid?:any;
}


export const Textbox: React.FC<textboxProps> =
    (props) => {
        let requiredView: {};
        let tooltipView: {};
        if (props.Required)
            requiredView = <span className="req">*</span>;

        if (props.tooltip) 
            tooltipView= props.tooltipText instanceof String?  <Popup content={props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />:<Popup children={props.tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />;

        const handleChange = (e)=>{
            e.persist();
            props.handleInputChange(e.target.value, props.ctrlName)
        }

        if (props.showError)
            return (

                <div className="field error">

                    <label>{props.label}{requiredView} {tooltipView}</label>
                    <input name={props.ctrlName} type="text"
                     value={props.value} 
                     placeholder={props.showPlaceholder ? props.label : ''}
                     id={props.Inputid}
                     required={props.Required} onChange={(e)=>handleChange(e)} disabled={props.disabled} />

                    <div className="validateMsg">
                        <p><Icon iconName='info' />{props.errorMessage}
                        </p>
                    </div>
                </div>);

        return (

            <div className="field ">

                <label>{props.label}{requiredView} {tooltipView}</label>
                <input name={props.ctrlName} type="text" value={props.value} 
                placeholder={props.showPlaceholder ? props.label : ''} 
                id={props.Inputid}
                 required={props.Required} onChange={(e)=>handleChange(e)} disabled={props.disabled} />
            </div>);
    };
