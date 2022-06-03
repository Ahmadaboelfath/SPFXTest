export default interface IFolderService {
  create(libraryName: string, folderName: string): Promise<string>;
}
