import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
import { MDBContainer, MDBInput } from 'mdbreact';

import styles from './Forms.module.scss';
import { Form, Checkbox } from 'semantic-ui-react';
import { TooltipHost, ITooltipHostStyles ,ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';
import IValidator from './Validations/Interfaces/IValidator';

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
    validations?: IValidator[];

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



      
    return (
        <div className={mainDevStyle}>
            <label>{props.label} {requiredStr} {tooltipView}</label>
                <Checkbox
                    radio
                    label='Yes'
                    name={props.ctrlName}
                    value='Yes'
                    checked={(props.value == 'Yes')} 
                    // checked={props.value} 
                    onChange={(e) => props.handleInputChange(e,props.ctrlName,"Yes")}
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

            {/* <MDBContainer className="mt-5">
                <MDBInput onClick={(e) => props.handleInputChange(e,"Yes")} name={props.ctrlName} 
                checked={props.value} 
                label="Yes" type="radio"
                    id="radio1" containerClass='mr-5'/>
                <MDBInput 
                onClick={(e) => props.handleInputChange(e,"No")} 
                name={props.ctrlName} 
                checked={!props.value} 
                label="No" 
                type="radio"
                    id="radio2"
                    containerClass='mr-5' />
            </MDBContainer> */}

            {props.showError &&
                <div className={styles.validateMsg}>
                    <p><Icon iconName='info' />{props.errorMessage}
                    </p>
                </div>
            }
        </div>
    );
};
