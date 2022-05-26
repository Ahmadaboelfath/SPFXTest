import { Chip } from "@material-ui/core";
import * as React from "react";
import IFileItemProps from "./FileItemProps";
import DoneIcon from "@material-ui/icons/Done";
import { anchorProperties, Icon } from "office-ui-fabric-react";

export default class FileItem extends React.Component<IFileItemProps,{}>{
    // private fileName: string ;
    private fileIcons:any;
    
    constructor(props) {
        super(props);
        // this.fileName = this.props.fileInfo.fileName? this.props.fileInfo.fileName: this.props.fileInfo.file.name
        this.fileIcons = {
            "application/pdf": <Icon iconName="PDF" />,
            "application/vnd.ms-excel": <Icon iconName="ExcelDocument"/>,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": <Icon iconName="ExcelDocument"/>,
            "application/msword": <Icon iconName="WordDocument"/>,
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Icon iconName="WordDocument"/>
        }
        
    } 
    
    onDelete():void{
        this.props.onDelete(this.props.fileInfo, this.props.ctrlName);
    }

    onClick():void{
        this.props.onClick(this.props.fileInfo, this.props.ctrlName);
    }

    renderIcon(): JSX.Element{
        if(this.props.fileInfo.file){
            if(this.fileIcons[this.props.fileInfo.file.type]){
                return this.fileIcons[this.props.fileInfo.file.type];
            }else{
                return <Icon iconName="TextDocument"/>
            }
        }
    }


    render():JSX.Element{
        return(
            <Chip
            icon={this.renderIcon()}
            label={this.props.fileInfo.fileName? this.props.fileInfo.fileName: this.props.fileInfo.file.name}
            clickable
            color="default"
            onDelete={() => this.onDelete()}
            onClick = {()=> this.onClick()}
          />
        )
    }
}