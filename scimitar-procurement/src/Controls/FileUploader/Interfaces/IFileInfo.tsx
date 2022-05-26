import { Guid } from "@microsoft/sp-core-library";
import { FileSource } from "../enums";

export default interface IFileInfo {
  file?: File;
  SPId?: string;
  fileName?: string;
  identifier: Guid;
  fileSource: FileSource;
  link: string;
}
