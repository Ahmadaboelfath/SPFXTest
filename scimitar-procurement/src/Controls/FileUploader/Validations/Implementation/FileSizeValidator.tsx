import IFileInfo from "../../Interfaces/IFileInfo";
import IStamp from "../Interfaces/IStamp";
import IValidator from "../Interfaces/IValidator";
import IFileSizePayload from "../Payloads/IFileSizePayload";

export default class FileSizeValidator implements IValidator {
  private _payload: IFileSizePayload;
  constructor(payload: IFileSizePayload) {
    this._payload = payload;
  }
  validate(value: File): IStamp {
    if (value.size > this._payload.fileSize) {
      return {
        isValid: false,
        errorMessage: `Uploaded file cannot exceed ${
          this._payload.fileSize / 1024 / 1024
        }MB`,
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }
}
