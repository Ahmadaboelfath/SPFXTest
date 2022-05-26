import IChoiceService from "./IChoiceService";
import { sp } from "@pnp/sp";
import {
  IField,
  IFieldInfo,
  ChoiceFieldFormatType,
} from "@pnp/sp/fields/types";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";

export default class ChoiceService implements IChoiceService {
  async getChoicesFromChoiceField(
    listName: string,
    fieldTitleOrInternalName: string
  ): Promise<string[]> {
    const choiceField: any = await sp.web.lists
      .getByTitle(listName)
      .fields.getByInternalNameOrTitle(fieldTitleOrInternalName)
      .get();

    return choiceField.Choices;
  }
}
