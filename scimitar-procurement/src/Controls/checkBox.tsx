
import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
interface IVFCheckBoxProps {
    handleInputChange(event, isChecked);
    LabelText: string;
    Required?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    showError?: boolean;
    ctrName: string;
    tooltip?: boolean;
    tooltipText?: string;
    checked?: boolean;
    switchBox?: boolean;
    customClass?:string;
}


export const CheckBox: React.FC<IVFCheckBoxProps> = (props) => {


    if (props.switchBox) {
        return (

            <div className='custom-control custom-switch'>
                <input
                    type='checkbox'
                    data-value={props.LabelText}
                    className={'custom-control-input' + props.customClass}
                    id={props.ctrName}
                    checked={props.checked}
                    onChange={e => props.handleInputChange}
                    disabled = {props.disabled}
                />
                <label className='custom-control-label' htmlFor={props.ctrName}>
                    {props.LabelText}
                </label>
            </div>

        );
    }
    else {
        return (




            <>
                <Checkbox
                    onChange={props.handleInputChange}
                    name={props.ctrName}
                    inputProps={{'data-value' :props.LabelText} as any}
                    label={props.LabelText}
                    checked={props.checked}
                    className={props.customClass}
                    disabled = {props.disabled}
                />
                {props.showError &&
                      <div className="validateMsg">
                      
                        {props.errorMessage}
                    </div>
                }

            </>
        );
    }
};

