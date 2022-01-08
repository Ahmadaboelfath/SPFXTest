import * as React from 'react';
import styles from './Accordion.module.scss';
import { IAccordionProps, IAccordionState } from './index';
import { css } from "@uifabric/utilities/lib/css";
import { DefaultButton, IIconProps, CompoundButton } from 'office-ui-fabric-react';
import { Icon } from "office-ui-fabric-react/lib/Icon";

const collapsedIcon: IIconProps = { iconName: 'ChevronDown', className: styles.accordionChevron };
const expandedIcon: IIconProps = { iconName: 'ChevronUp', className: styles.accordionChevron };

const FiltercollapsedIcon: IIconProps = { iconName: 'Filter', className: styles.accordionChevron };
const FilterexpandedIcon: IIconProps = { iconName: 'ClearFilter', className: styles.accordionChevron };


const assignicon: IIconProps = { iconName: 'UserFollowed', className: styles.accordionChevron };

export class Accordion extends React.Component<IAccordionProps, IAccordionState> {
  private _drawerDiv: HTMLDivElement = undefined;
  constructor(props: IAccordionProps) {
    super(props);

    this.state = {
      expanded: props.collapsed == false ? true :  false
    };

    console.log(props.collapsed);
  }

  public render(): React.ReactElement<IAccordionProps> {
    return (

      <>
      {this.props.assignAccordion == true ? 

            <div className={styles.assignAccordion}>
            <CompoundButton
              toggle
              className={this.state.expanded ?  styles.assignedUsers  :  styles.assignedUsers }
              checked={this.state.expanded}
              onClick={() => {
                this.setState({
                  expanded: !this.state.expanded
                });
              }}
              aria-expanded={this.state.expanded}
              aria-controls={this._drawerDiv && this._drawerDiv.id}
            >
              <Icon iconName="UserFollowed" />{this.props.title}
    
            </CompoundButton>
              <div className={this.state.expanded?  styles.show + ' ' + styles.assignedBox  :  styles.assignedBox } ref={(el) => { this._drawerDiv = el; }}>
                {this.props.children}
              </div>
          </div>
      :
      this.props.tabAccordion == true ? 
      
      <div className={css(styles.tabAccordion, this.props.className)}>
      <CompoundButton
        toggle
        className={this.state.expanded ? styles.tabaccordionButtonActive : styles.tabaccordionButton  }
        checked={this.state.expanded}
        iconProps={this.state.expanded ?  (this.props.filterAccordion == true ?  FilterexpandedIcon : expandedIcon ) : (this.props.filterAccordion == true ?  FiltercollapsedIcon : collapsedIcon )  }
        onClick={() => {
          this.setState({
            expanded: !this.state.expanded
          });
        }}
        aria-expanded={this.state.expanded}
        aria-controls={this._drawerDiv && this._drawerDiv.id}
      >
        <div  dangerouslySetInnerHTML={{ __html: this.props.title }}></div>

      </CompoundButton>
        <div className={this.state.expanded?  styles.showBox + ' ' + styles.drawer  :  styles.drawer } ref={(el) => { this._drawerDiv = el; }}>
            {this.props.children}
        </div>
    </div>

      :
      <div className={css(styles.accordion, this.props.className)}>
        <CompoundButton
          toggle
          className={this.state.expanded ? (this.props.filterAccordion == true ?  styles.FilteraccordionButtonActive : styles.accordionButtonActive  )  : (this.props.filterAccordion == true ?  styles.FilteraccordionButton : styles.accordionButton  )}
          checked={this.state.expanded}
          iconProps={this.state.expanded ?  (this.props.filterAccordion == true ?  FilterexpandedIcon : expandedIcon ) : (this.props.filterAccordion == true ?  FiltercollapsedIcon : collapsedIcon )  }
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded
            });
          }}
          aria-expanded={this.state.expanded}
          aria-controls={this._drawerDiv && this._drawerDiv.id}
        >
          <div  dangerouslySetInnerHTML={{ __html: this.props.title }}></div>

        </CompoundButton>
          <div className={this.state.expanded?  styles.showBox + ' ' + styles.drawer  :  styles.drawer } ref={(el) => { this._drawerDiv = el; }}>
           <div className={styles.boxDrawer}> {this.props.children}</div>
          </div>
      </div>
    }
    </>
    );
  }
}

