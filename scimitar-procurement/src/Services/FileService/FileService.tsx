import IFileInfo from "../../Controls/FileUploader/Interfaces/IFileInfo";
import IFileService from "./IFileService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { FileSource } from "../../Controls/FileUploader/enums";
import { Guid, ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import IMetadata from "./IMetadata";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

export default class FileService implements IFileService {
  public static readonly serviceKey: ServiceKey<IFileService> =
    ServiceKey.create<IFileService>("Procurement:FileService", FileService);
  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;
  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }

  async getFileByMetadata(
    libraryName: string,
    folderName: string,
    metadata: IMetadata
  ): Promise<IFileInfo[]> {
    const serverRelativeUrl = this._pageContext.web.serverRelativeUrl;
    const absoluteUrl = this._pageContext.web.absoluteUrl;
    const folderUrl = `${absoluteUrl}/_api/web/getFolderByServerRelativeUrl('${serverRelativeUrl}/${libraryName}/${folderName}')?$expand=Files,Files/ListItemALlFields,Files/ServerRelativeUrl,Files/Name&$select=*,Files,Files/ListItemAllFields,Files/ServerRelativeUrl,Files/Name`;
    const response = await this._spHttpClient.get(
      folderUrl,
      SPHttpClient.configurations.v1
    );

    if (response.status === 200 || response.status === 201) {
      const folder = await response.json();
      if (folder.Files.length > 0) {
        const neededFiles = folder.Files.filter(
          (file) => file.ListItemAllFields[metadata.propName] === metadata.value
        );

        if (neededFiles.length > 0) {
          return neededFiles.map((file) => {
            return {
              fileSource: FileSource.Server,
              identifier: Guid.newGuid(),
              link: file.ServerRelativeUrl,
              SPId: file.ListItemAllFields.Id,
              fileName: file.Name,
            };
          });
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  }

  async getFileByName(
    libraryName: string,
    folderName: string,
    fileName: string
  ): Promise<IFileInfo> {
    const web = await sp.web.get();
    const fileUrl = `${web.ServerRelativeUrl}/${libraryName}/${folderName}/${fileName}`;
    const file = await sp.web.getFileByServerRelativeUrl(fileUrl).get();
    const fileInfo: IFileInfo = {
      fileSource: FileSource.Server,
      identifier: Guid.newGuid(),
      link: file.ServerRelativeUrl,
      SPId: file.UniqueId,
      fileName: file.Name,
    };
    return fileInfo;
  }
  async updateMetadata(
    libraryName: string,
    folderName: string,
    fileName: string,
    metadataObject: any
  ): Promise<IFileInfo> {
    const web = await sp.web.get();
    const fileUrl = `${web.ServerRelativeUrl}/${libraryName}/${folderName}/${fileName}`;
    const item = await sp.web.getFileByServerRelativeUrl(fileUrl).getItem();
    item.update(metadataObject);
    return await this.getFileByName(libraryName, folderName, fileName);
  }

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
  ): Promise<IFileInfo[]> {
    const filePath = `${libraryName}/${folderName}`;
    const files = await sp.web.getFolderByServerRelativePath(filePath).files;
    if (files.length > 0) {
      const files = await sp.web
        .getFolderByServerRelativePath(filePath)
        .files.get();

      return [
        {
          fileSource: FileSource.Server,
          identifier: Guid.newGuid(),
          link: files[0].ServerRelativeUrl,
          SPId: files[0].UniqueId,
          fileName: files[0].Name,
        },
      ];
    } else {
      return [];
    }
  }
  async uploadToFolder(
    libraryName: string,
    folderName: string,
    file: IFileInfo,
    progressEvent: (data) => void
  ): Promise<IFileInfo> {
    const fileName = file.fileName ? file.fileName : file.file.name;
    const serverRelativePath = `${libraryName}/${folderName}`;

    if (file.file.size <= 10485760) {
      const fileAddResult = await sp.web
        .getFolderByServerRelativePath(serverRelativePath)
        .files.addUsingPath(fileName, file.file, { Overwrite: true });
    } else {
      const fileAddResult = await sp.web
        .getFolderByServerRelativePath(serverRelativePath)
        .files.addChunked(
          fileName,
          file.file,
          (data) => progressEvent(data),
          true
        );
    }

    return file;
  }
}
