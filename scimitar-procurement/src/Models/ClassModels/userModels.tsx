export interface IUserValue {
    name: string;
    email: string;
}

export interface IUserLookup {
    id: number;
    title: string;
    email?: string;
    imageUrl?:string;
}

export interface IUserSuggestion {
    id: string;    
    email: string;
    displayName: string;
    isUser: boolean;   
    isUnvalidatedEmail: boolean;
    isADGroup: boolean;
    imageUrl?:string;
}

export interface IPrincipal {
    id: number;
    email: string;
    displayName: string;
    loginName: string;
    isUser: boolean;
    imageUrl?: string;
    function?: string;
    name?: string;
}

export interface ISPUserSearchResponse {
    value?: string; // JSON IUserSearchJSON
}

export interface ISPEnsureUserResponse {
    Id?: number;
    IsHiddenInUI?: boolean;
    LoginName?: string;
    Title?: string;
    PrincipalType?: number;
    Email?: string;
    IsEmailAuthenticationGuestUser?: boolean;
    IsShareByEmailGuestUser?: boolean;
    IsSiteAdmin?: boolean;
    UserPrincipalName?: string;
}

export interface ISPUserSearchJSON {
    Key?: string;
    DisplayText?: string;
    IsResolved?: boolean;
    Description?: string;
    EntityType?: string;
    EntityData?: {
        IsAltSecIdPresent?: string;
        Title?: string;
        Email?: string;
        MobilePhone?: string;
        ObjectId?: string;
        SPGroupID?: string;
        SPUserID?: string;
        PrincipalType?: string;
        Department?: string;
    };
    MultipleMatches?: any[];
    ProviderName?: string;
    ProviderDisplayName?: string;
}