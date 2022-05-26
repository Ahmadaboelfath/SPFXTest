import IStamp from "../Interfaces/IStamp";
import IValidator from "../Interfaces/IValidator";
import IFileExtensionPayload from "../Payloads/IFileExtensionPayload";

export default class FileExtensionValidator implements IValidator {
  private _payload: IFileExtensionPayload;

  constructor(payload: IFileExtensionPayload) {
    this._payload = payload;
  }

  validate(value: File): IStamp {
    const fileExtension = this.getFileExtension(value);
    const fileExtensionFound = this._payload.fileExtension.filter(
      (extension) => extension === fileExtension
    );
    if (fileExtensionFound.length === 0) {
      return {
        isValid: false,
        errorMessage: `Uploaded files should have these extensions ${this._payload.fileExtension.join(
          ", "
        )}`,
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  private getFileExtension(file: File): string {
    const splittedFileName: string[] = file.name.split(".");
    const extension = `.${splittedFileName[splittedFileName.length - 1]}`;
    return extension;
  }
}
