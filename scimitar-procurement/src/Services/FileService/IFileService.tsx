import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";

export default interface IFileService {
  uploadToFolder(
    libraryName: string,
    folderName: string,
    file: IFileInfo
  ): Promise<IFileInfo>;

  getFileInFolder(libraryName: string, folderName: string): Promise<IFileInfo>;
  delete(
    libraryName: string,
    folderName: string,
    fileName: string
  ): Promise<IFileInfo>;
}
