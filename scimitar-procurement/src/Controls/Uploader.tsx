import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Popup } from 'semantic-ui-react';
import { MDBContainer, MDBInput } from 'mdbreact';

import styles from './Forms.module.scss';
import { Form, Checkbox } from 'semantic-ui-react';
import { TooltipHost, ITooltipHostStyles, ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
import { useId } from '@uifabric/react-hooks';

const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };




interface IUploaderProps {
    ctrlName: string;
    label: string;
    Required?: boolean;
    errorMessage?: string;
    showError?: Boolean;
    tooltip?: Boolean;
    tooltipText?: any;
    disabled?: boolean;
    fileURL?: string;
    onFileChange();
    removeFile();
}


export const Uploader: React.FC<IUploaderProps> = (props) => {


    function createMarkup() {
        return { __html: props.tooltipText };
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
        tooltipView = <TooltipHost id={props.ctrlName} tooltipProps={tooltipProps} styles={hostStyles}>
            <Icon iconName='Info' className="tooltip-icon" />
        </TooltipHost>;

    let mainDevStyle = "field";
    if (props.showError) {
        mainDevStyle = "field error";
    }



    return (
        <div className={mainDevStyle}>
            <label>{props.label} {requiredStr} {tooltipView}</label>
            {!props.fileURL &&
                <>
                    <input type="file" id="uploadFile" onChange={props.onFileChange}/>




                    {props.showError &&
                          <div className="validateMsg">
                            <p><Icon iconName='info' />{props.errorMessage}
                            </p>
                        </div>
                    }
                </>
            }
            {props.fileURL && 
            <>
            <a href={props.fileURL} data-interception="off" target="_blank" rel="noopener noreferrer">Link</a>
            <span
                      onClick={props.removeFile}
                    >
                      {" "}
                      <Icon iconName="Delete" className="deleteFileIcon" />
                    </span>
            </>
            }
        </div>
    );
};
