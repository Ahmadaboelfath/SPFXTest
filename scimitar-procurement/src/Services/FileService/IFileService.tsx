import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import IMetadata from "./IMetadata";

export default interface IFileService {
  uploadToFolder(
    libraryName: string,
    folderName: string,
    file: IFileInfo,
    progressEvent: (data) => void
  ): Promise<IFileInfo>;

  getFileInFolder(
    libraryName: string,
    folderName: string
  ): Promise<IFileInfo[]>;
  delete(
    libraryName: string,
    folderName: string,
    fileName: string
  ): Promise<IFileInfo>;

  updateMetadata(
    libraryName: string,
    folderName: string,
    fileName: string,
    metadataObject: any
  ): Promise<IFileInfo>;

  getFileByName(
    libraryName: string,
    folderName: string,
    fileName: string
  ): Promise<IFileInfo>;

  getFileByMetadata(
    libraryName: string,
    folderName: string,
    metadata: IMetadata
  ): Promise<IFileInfo[]>;
}
