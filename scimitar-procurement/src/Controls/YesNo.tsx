import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
import { MDBContainer, MDBInput } from 'mdbreact';

import styles from './Forms.module.scss';
import { Form, Checkbox } from 'semantic-ui-react';
import { TooltipHost, ITooltipHostStyles ,ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };




interface IYesNoProps {
    value?: any;
    handleInputChange(event,ctrlName, value);
    ctrlName: string;
    label: string;
    Required?: boolean;
    errorMessage?: string;
    showError?: Boolean;
    tooltip?: Boolean;
    tooltipText?: any;
    disabled?: boolean;
    yesText?:string;
}


export const YesNo: React.FC<IYesNoProps> = (props) => {


    function createMarkup() {
        return {__html: props.tooltipText};
      }
    let tooltipProps: ITooltipProps = {
        onRenderContent: () => (

            <div dangerouslySetInnerHTML={createMarkup()} />
            
        ),
    };

    
    let requiredStr;
    let tooltipView: {};
    if (props.Required) {
        requiredStr = <span className="req">*</span>;
    }

    if (props.tooltip)
    tooltipView =<TooltipHost id={props.ctrlName} tooltipProps={tooltipProps} styles={hostStyles}>
    <Icon iconName='Info' className="tooltip-icon" />
    </TooltipHost>;

    let mainDevStyle = "field";
    if (props.showError) {
        mainDevStyle = "field error";
    }

    const yesValue = props.yesText || 'Yes';

      
    return (
        <div className={mainDevStyle}>
            <label>{props.label} {requiredStr} {tooltipView}</label>
                <Checkbox
                    radio
                    label={yesValue}
                    name={props.ctrlName}
                    value={yesValue}
                    checked={(props.value == yesValue )} 
                    onChange={(e) => props.handleInputChange(e,props.ctrlName,yesValue)}
                />
                <Checkbox
                    radio
                    label='No'
                    name={props.ctrlName}
                    value='No'
                    // checked={!props.value} 
                    checked={(props.value == 'No')} 
                    onChange={(e) => props.handleInputChange(e,props.ctrlName,"No")} 
                />

           

            {props.showError &&
                  <div className="validateMsg">
                    <p><Icon iconName='info' />{props.errorMessage}
                    </p>
                </div>
            }
        </div>
    );
};
