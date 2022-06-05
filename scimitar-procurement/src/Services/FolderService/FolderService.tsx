import IFolderService from "./IFolderService";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import { sp } from "@pnp/sp";

export default class FolderService implements IFolderService {
  async deletefiles(libraryName: string, folderName: string): Promise<boolean> {
    try {
      const files = await sp.web
        .getFolderByServerRelativePath(`${libraryName}/${folderName}`)
        .files.get();
      if (files.length > 0) {
        const deleted = await Promise.all(
          files.map(async (file) => {
            const fileDeleteResult = await sp.web
              .getFileByServerRelativePath(file.ServerRelativeUrl)
              .delete();
            return true;
          })
        );

        let allDeleted = true;
        deleted.forEach(
          (value) => (allDeleted = value == false ? value : true)
        );
        return allDeleted;
      } else {
        return true;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async create(libraryName: string, folderName: string): Promise<string> {
    try {
      const createdFolder = await sp.web.folders.addUsingPath(
        `${libraryName}/${folderName}`
      );
      return createdFolder.data.Name;
    } catch (e) {
      throw new Error(
        `following error ocurred while creating the folder:${e.message}`
      );
    }
  }
}
