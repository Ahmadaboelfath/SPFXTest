import IFolderService from "./IFolderService";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import { sp } from "@pnp/sp";

export default class FolderService implements IFolderService {
  async create(libraryName: string, folderName: string): Promise<string> {
    try {
      const isFound = await sp.web
        .getFolderByServerRelativePath(`${libraryName}/${folderName}`)
        .get();
      if (isFound.Exists) {
        throw new Error(`Folder with name ${folderName} is already found `);
      } else {
        const createdFolder = await sp.web.folders.addUsingPath(
          `${libraryName}/${folderName}`
        );
        return createdFolder.data.Name;
      }
    } catch (e) {
      throw new Error(
        `following error ocurred while creating the folder:${e.message}`
      );
    }
  }
}
