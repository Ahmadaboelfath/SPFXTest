import {
  DropzoneArea,
  DropzoneAreaBase,
  FileObject,
} from "material-ui-dropzone";
import * as React from "react";
import IFileUploaderProps from "./IFileUploaderProps";
import classes from "./FileUploader.module.scss";
import Dropzone from "react-dropzone";
import IFileInfo from "./Interfaces/IFileInfo";
import FileItem from "./components/FileItem/FileItem";
import { addItemToArrayImmutably } from "./arrayUtilities";
import { Guid } from "@microsoft/sp-core-library";
import { FileSource } from "./enums";
import { Popup } from "semantic-ui-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import styles from "../Forms.module.scss";

const FileUploader: React.FunctionComponent<IFileUploaderProps> = (props) => {
  let fileObject: FileObject[] = props.value.map((file) => {
    return { data: null, file: file.file };
  });

  let requiredView: {};
  let tooltipView: {};
  if (props.required) requiredView = <span className="req">*</span>;

  if (props.tootipText)
    tooltipView = (
      <Popup
        content={props.tootipText}
        trigger={<Icon iconName="Info" className="tooltip-icon" />}
      />
    );

  const onChange = (files: FileObject[]) => {
    const value: IFileInfo[] = props.value;
    fileObject = addItemToArrayImmutably(fileObject, files);
    const mappedFiles: IFileInfo[] = files.map((file) => {
      return {
        identifier: Guid.newGuid(),
        file: file.file,
        fileName: file.file.name,
        link: "",
        fileSource: FileSource.Client,
      };
    });
    const allFiles = addItemToArrayImmutably(value, mappedFiles);
    props.onChange(allFiles, props.ctrlName);
  };

  const renderFileItems = (): JSX.Element[] => {
    return props.value.map((fileInfo) => {
      return (
        <FileItem
          fileInfo={fileInfo}
          onClick={(file, ctrlName) => props.onClick(file, ctrlName)}
          onDelete={(file, ctrlName) => props.onDelete(file, ctrlName)}
          ctrlName={props.ctrlName}
        />
      );
    });
  };
  // console.log("props.value", props.value);
  return (
    <div className="field">
      <div className={!props.isValid ? "field error" : "field"}>
        {props.label ? (
          <label>
            {props.label}
            {requiredView}
            {tooltipView}
          </label>
        ) : (
          ""
        )}
        <DropzoneAreaBase
          showPreviews={false}
          showPreviewsInDropzone={false}
          fileObjects={fileObject}
          useChipsForPreview
          onAdd={(files) => onChange(files)}
          acceptedFiles={props.allowedFileTypes}
          dropzoneText={props.placeholder}
          dropzoneProps={{ disabled: props.readonly }}
          maxFileSize={props.fileMaxSize}
          // dropzoneClass={props.readonly ? classes.hideFileUploader : classes.dropzone}
          classes={{
            root: props.readonly ? classes.hideFileUploader : classes.dropzone,
          }}
        />
        {/* <div className={classes.filesList}>{renderFileItems()}</div> */}
        <div className={classes.filesList}>
          {props.value.length > 0 ? (
            props.value.map((fileInfo) => (
              <FileItem
                fileInfo={fileInfo}
                onClick={(file, ctrlName) => props.onClick(file, ctrlName)}
                onDelete={(file, ctrlName) => props.onDelete(file, ctrlName)}
                ctrlName={props.ctrlName}
              />
            ))
          ) : (
            <>
              <span className={styles.nodataBox}>
                There're no Attachments yet
              </span>
            </>
          )}
        </div>
      </div>
      {!props.isValid ? (
        <div className={styles.validateMsg}>
          <p>
            <Icon iconName="info" />
            {props.errorMessage}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FileUploader;
