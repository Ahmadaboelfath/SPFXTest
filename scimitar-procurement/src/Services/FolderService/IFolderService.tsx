export default interface IFolderService {
  create(libraryName: string, folderName: string): Promise<string>;
  deletefiles(libraryName: string, folderName: string): Promise<boolean>;
}
