
export interface IAccordionProps {
  collapsed?: boolean;
  title: string;
  className?: string;
  filterAccordion?:boolean;
  assignAccordion?:boolean;
  tabAccordion?:boolean;
}

export interface IAccordionState {
  expanded: boolean;
}
