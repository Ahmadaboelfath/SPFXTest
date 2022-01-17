import { DropdownItemProps } from "semantic-ui-react";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class DepartmentService {
  public async getDepartmentsLookup(): Promise<DropdownItemProps[]> {
    const items = await sp.web.lists
      .getByTitle("Departments")
      .items.top(5000)
      .get();

    return items.map((item) => {
      return {
        text: item.Title,
        value: item.Title,
      };
    });
  }
}
