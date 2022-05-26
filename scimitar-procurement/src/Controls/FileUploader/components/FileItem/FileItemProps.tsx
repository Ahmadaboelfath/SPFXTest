import IFileInfo from "../../Interfaces/IFileInfo";

export default interface IFileItemProps{
    fileInfo: IFileInfo;
    onDelete: (file:IFileInfo, ctrlName: string)=>void;
    onClick: (file:IFileInfo, ctrlName: string)=>void;
    ctrlName: string;
}