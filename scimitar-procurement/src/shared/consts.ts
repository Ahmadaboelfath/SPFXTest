
export class consts {
    public static readonly DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
    public static readonly DateFormat = "yyyy-MM-dd";
    public static readonly host = "https://vodafone.sharepoint.com";
    public static readonly emailTemplates = {
        MessageAdded: "MessageAdded",
        MessageUpdated: "MessageUpdated",
        SecurityInvolved: "SecurityInvolved",
        PrivacyInvolved: "PrivacyInvolved",
        WorkCouncilInvolved: "WorkCouncilInvolved",
        AdoptionMaterialInvolved: "AdoptionMaterialInvolved",
        TargetReleaseInvolved: "TargetReleaseInvolved",
        ServiceEnablementInvolved: "ServiceEnablementInvolved",
        UserAssignedToMessage: "UserAssignedToMessage",
        IssueRaised: "IssueRaised"
    };
}

export enum ProcessStage{
    Notassigned = "Not assigned",
    Assigned = "Assigned",
    Evaluation = "Evaluation",
    ProcessedSolutionOwnertesting = "Processed - Solution Owner testing",
    Testing = "Testing",
    DeployMinorchange = "Deploy - Minor change",
    DeployStandardChange = "Deploy - Standard Change",
    O365EvergreenBoard = "Deploy Project",
    OnHold = "On Hold",
    Completed = "Completed",
    ServiceNotInUse = "Service not in use",
    Other = "Other",
    Archived = "Archived",
}