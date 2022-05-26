export default interface IChoiceService {
  getChoicesFromChoiceField(
    listName: string,
    fieldTitleOrInternalName: string
  ): Promise<string[]>;
}
