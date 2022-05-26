import { isNull, isString } from "lodash";
import IStamp from "../Interfaces/IStamp";
import IValidator from "../Interfaces/IValidator";

export default class RequiredValidation implements IValidator {
  validate(value: any): IStamp {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return {
          isValid: false,
          errorMessage: "This field is Required",
        };
      } else {
        return {
          isValid: true,
          errorMessage: "",
        };
      }
    } else if (isNull(value)) {
      {
        return {
          isValid: false,
          errorMessage: "This field is Required",
        };
      }
    } else {
      if (isString(value) && !value.trim()) {
        return {
          isValid: false,
          errorMessage: "This field is Required",
        };
      } else {
        return {
          isValid: true,
          errorMessage: "",
        };
      }
    }
  }
}
