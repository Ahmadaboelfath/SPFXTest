import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import IFileService from "./IFileService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { FileSource } from "../../Controls/FileUploader/enums";
import { Guid } from "@microsoft/sp-core-library";

export default class FileService implements IFileService {
  async delete(
    libraryName: string,
    folderName: string,
    fileName: string
  ): Promise<IFileInfo> {
    try {
      const deleteResult = await sp.web
        .getFolderByServerRelativePath(`${libraryName}/${folderName}`)
        .files.getByName(fileName)
        .delete();

      return {
        fileSource: FileSource.Server,
        identifier: Guid.newGuid(),
        link: "",
        fileName: fileName,
      };
    } catch (e) {
      throw "error occurred while deleting the file";
    }
  }
  async getFileInFolder(
    libraryName: string,
    folderName: string
  ): Promise<IFileInfo> {
    const filePath = `${libraryName}/${folderName}`;
    const exists = await sp.web.getFolderByServerRelativePath(filePath).files
      .length;
    if (length > 0) {
      const files = await sp.web
        .getFolderByServerRelativePath(filePath)
        .files.get();

      return {
        fileSource: FileSource.Server,
        identifier: Guid.newGuid(),
        link: files[0].ServerRelativeUrl,
        fileName: files[0].Name,
      };
    } else {
      throw new Error("File requested not found!");
    }
  }
  async uploadToFolder(
    libraryName: string,
    folderName: string,
    file: IFileInfo
  ): Promise<IFileInfo> {
    const fileName = file.fileName ? file.fileName : file.file.name;
    const serverRelativePath = `${libraryName}/${folderName}`;
    const fileAddResult = await sp.web
      .getFolderByServerRelativePath(serverRelativePath)
      .files.addUsingPath(fileName, file.file, { Overwrite: false });

    return file;
  }
}
