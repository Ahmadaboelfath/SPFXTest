import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProcurementAppWebPartStrings';
import ProcurementApp from './components/ProcurementApp';
import { IProcurementAppProps } from './components/IProcurementAppProps';
import DependencyManager from '../../DependencyManger/DependencyManger';
import {sp} from "@pnp/sp";

export interface IProcurementAppWebPartProps {
  description: string;
}

export default class ProcurementAppWebPart extends BaseClientSideWebPart<IProcurementAppWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProcurementAppProps> = React.createElement(
      ProcurementApp,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public onInit(): Promise<any>{
    return(
      super.onInit().then(()=>{
          const dependencyManager = DependencyManager.getInstance();
          dependencyManager.configure(this.context.serviceScope);
          sp.setup({
            spfxContext: this.context
          });
        })
      );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
