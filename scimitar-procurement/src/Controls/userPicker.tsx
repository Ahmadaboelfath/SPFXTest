
import * as React from "react";
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona';
import { IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/components/pickers';
import { IUserLookup, IUserSuggestion } from '../Models/userModels';
import SPOperations from "../shared/SPOperations";

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './Forms.module.scss';
import { Popup } from 'semantic-ui-react';
const DEFAULT_LIMIT = 7;
const EMAIL_REGEX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

const SUGGESTION_PROPS: IBasePickerSuggestionsProps = {
    noResultsFoundText: 'No results found',
    loadingText: 'Searching...',
    showRemoveButtons: true,
    className: 'wm-vf-ireport-library-app wm-suggestions user-picker__suggestions'
};

export interface IUserPickerPersonaProps extends IPersonaProps {
    id: string;
    isEnsured: boolean;
    isDLGroup: boolean;
    isUnvalidatedEmail: boolean;
}

export interface IUserPickerProps  {
    peopleOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    suggestionsLimit?: number;
    tooltip?: Boolean;
    tooltipText?: string;
    showError?: Boolean;
    single?: boolean;
    selected: IUserLookup[];
    errorMessage?: string;
    onChange: (selected: IUserLookup[]) => void;
}

/**
 * Simple user picker.
 * Allows to search for users and groups.
 */

export default class UserPicker extends React.PureComponent<IUserPickerProps> {

    
    private ref = React.createRef<any>();

    constructor(props, context) {
        super(props, context);
    }

    private getTextFromItem(persona: IPersonaProps): string {
        return persona.text as string;
    }

    private onChange = async (items: IUserPickerPersonaProps[]) => {
        // console.log(items);
        const ensureList = items.filter(i => !i.isEnsured);
        const ensuredList = items.filter(i => i.isEnsured);
        // console.log(ensureList);
        // console.log(ensuredList);
        const users = await SPOperations.ensureUsers(ensureList.map(u => u.secondaryText!));
        // console.log(users);
        if (users.length < ensureList.length) {
            console.log(`User/Group not found or not supported: SharePoint doesn\'t support sharing by Distribution Lists, please use a different method.`);
        }
        const lookups = ensuredList
            .map(g => ({ id: +g.id, title: g.primaryText , email:g.secondaryText, imageUrl: g.imageUrl }))
            .concat(users.map(u => ({ id: +u.id, title: u.displayName, email:u.email, imageUrl: u.imageUrl }))) as IUserLookup[];
        this.props.onChange(lookups);
        this.clearPicker();
    }

    private clearPicker(): void {
        if (this.ref.current && this.ref.current.dismissSuggestions) {
            this.ref.current!.dismissSuggestions();
            if (this.ref.current.input.current && this.ref.current.input.current.clear) {
                this.ref.current!.input.current.clear();
            }
        }
    }

    private async resolveWithEmails(filterText: string): Promise<IUserSuggestion[]> {
        const emailsMatches = filterText.match(EMAIL_REGEX);
        if (emailsMatches) {
            const usersPromises = emailsMatches.map(m => {
                const user = SPOperations.findPeople(m, this.props.suggestionsLimit || DEFAULT_LIMIT, this.props.peopleOnly as boolean)
                    .then(x => x.length === 1 ? x[0] : undefined);
                return user;
            });
            const users = await Promise.all(usersPromises);
            return users.filter(u => !!u) as IUserSuggestion[];
        }
        return Promise.resolve([]);
    }

    private makeUserPersonaProps(suggestions: IUserSuggestion[]): IUserPickerPersonaProps[] {
        console.log(suggestions);
        return suggestions.map(u => ({
            id: u.id,
            primaryText: u.displayName,
            secondaryText: (u.isUser ? u.email : u.id),
            showSecondaryText: true,
            isUnvalidatedEmail: u.isUnvalidatedEmail,
            isEnsured: !u.isUser && !u.isADGroup && !u.isUnvalidatedEmail,
            imageUrl : u.imageUrl,
        } as IUserPickerPersonaProps)).filter(s => (this.props.selected || []).filter(u => u.email === s.secondaryText as any).length === 0); // no duplicates
    }

    private onResolveSuggestions = async (filterText: string): Promise<IPersonaProps[]> => {
        if (!filterText || this.props.single && this.props.selected.length > 0) {
            return [];
        }

        const [autoPickUsers, manualPickUsers] = await Promise.all([
            this.resolveWithEmails(filterText),
            SPOperations.findPeople(filterText, this.props.suggestionsLimit || DEFAULT_LIMIT, this.props.peopleOnly as boolean)
        ]);
        console.log(autoPickUsers);
        console.log(manualPickUsers);
        const autoPickProps = this.makeUserPersonaProps(autoPickUsers);
    
        const manualPickProps = this.makeUserPersonaProps(manualPickUsers).filter(m => autoPickProps.findIndex(a => a.id === m.id) === -1);
        if (autoPickProps.length > 0) {
            this.onChange(this.selectedItems.concat(autoPickProps));
        }
        return manualPickProps;
    }

    private get selectedItems(): IUserPickerPersonaProps[] {
        return this.props.selected.map(s => ({
            id: s.id.toString(),
            primaryText: s.title,
            showSecondaryText: false,
            secondaryText: s.email,
            isEnsured: true,
            imageUrl:s.imageUrl ? s.imageUrl : `/_layouts/15/userphoto.aspx?accountname=${s.email}&size=M`,
        } as IUserPickerPersonaProps));
    }

    public render(): React.ReactNode {
        const {  required, label, disabled, selected,tooltip ,tooltipText,showError,errorMessage } = this.props;
        let requiredView: {};
        let tooltipView: {};
        if (required)
            requiredView = <span className="req">*</span>;
        if (tooltip) 
        tooltipView=<Popup content={tooltipText} trigger={<Icon iconName='Info' className="tooltip-icon"/>} />;
            

        return (
            
            <div className={"field" + (disabled ? "disabledPeoplePicker" : "") + (showError ? "error" : "")}>
                {label && (<label>{label}{requiredView} {tooltipView}</label>)}
                <NormalPeoplePicker
                    componentRef={this.ref}
                    className="ms-PeoplePicker"
                    itemLimit={this.props.single ? 1 : 15}
                    onResolveSuggestions={this.onResolveSuggestions}
                    getTextFromItem={this.getTextFromItem}
                    selectedItems={this.selectedItems}
                    pickerSuggestionsProps={SUGGESTION_PROPS}
                    onChange={this.onChange}                    
                    resolveDelay={300}
                    disabled={disabled}
                />
                {showError && (  <div className="validateMsg">
                        <p><Icon iconName='info' />{errorMessage}
                        </p>
                    </div>)}
            </div>
        );
    }

}
