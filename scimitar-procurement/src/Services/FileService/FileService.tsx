import IFileService from "./IFileService";

export default class FileService implements IFileService {
  uploadToFolder(
    libraryName: string,
    folderName: string,
    file: File
  ): Promise<File> {
    throw new Error("Method not implemented.");
  }
}
