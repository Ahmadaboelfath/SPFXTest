export default interface IFileService {
  uploadToFolder(
    libraryName: string,
    folderName: string,
    file: File
  ): Promise<File>;
}
