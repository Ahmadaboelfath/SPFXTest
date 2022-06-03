export default interface ItemSubFormModalProps {
  onDialogDismiss(): void;
  onSubmitAction(): void;
  onCancelAction(): void;
  show: boolean;
  component: JSX.Element;
}
