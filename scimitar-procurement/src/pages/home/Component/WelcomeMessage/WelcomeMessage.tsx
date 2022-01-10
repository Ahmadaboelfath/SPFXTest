import * as React from "react";
import IWelcomeMessageProps from "./IWelcomeMessageProps";
import {Text} from "@microsoft/sp-core-library";
import {unescape, escape} from "@microsoft/sp-lodash-subset";
import ReactHtmlParser from 'react-html-parser';

export default class WelcomeMessage extends React.Component<IWelcomeMessageProps,{}> {
    private replaceText(): string{
        if(this.props.replacedText.length > 0){
            let replacedText = "";
            let el = document.createElement("div");
            el.innerHTML = this.props.message;
            this.props.replacedText.forEach((replacement)=>{
               el.innerHTML = Text.replaceAll(el.innerHTML, replacement.key, replacement.value);
            });
            return el.innerHTML;
        }else{
            return this.props.message;
        }
    }

    // dangerouslySetInnerHTML={{__html: this.replaceText()}}
    public render():JSX.Element{
        return(
            <div className = {this.props.className? this.props.className:""} >
                <h3>Hi <b>{this.props.userInfo},</b></h3>
                <p>
                {ReactHtmlParser(this.replaceText())}
                </p>
            </div>
        );
    }
}