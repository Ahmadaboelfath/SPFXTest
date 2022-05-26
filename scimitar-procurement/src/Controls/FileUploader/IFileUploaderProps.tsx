import IFileInfo from "./Interfaces/IFileInfo";

export default interface IFileUploaderProps {
  onChange: (files: IFileInfo[], ctrlName: string) => void;
  onDelete: (file: IFileInfo, ctrlName: string) => void;
  onClick: (file: IFileInfo, ctrlName: string) => void;
  value?: IFileInfo[];
  label?: string;
  required?: boolean;
  errorMessage?: string;
  isValid?: boolean;
  readonly?: boolean;
  ctrlName: string;
  // Should be written with the file mime type as in https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  allowedFileTypes?: string[];
  fileMaxSize?: number;
  tootipText?: string;
  placeholder?: string;
  disabeld?: boolean;
}
