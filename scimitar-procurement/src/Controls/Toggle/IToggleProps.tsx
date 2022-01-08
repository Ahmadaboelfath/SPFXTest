export default interface IToggleProps {
  label: string;
  activeText: string;
  inactiveText: string;
  controlPropName: string;
  onChange: (controlPropName: string) => void;
  disabled?: boolean;
}
