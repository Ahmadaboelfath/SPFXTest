import IReplacedText from "./IReplacedText";

export default interface IWelcomeMessageProps{
    message: string;
    userInfo:any;
    replacedText: IReplacedText[];
    className?: string;
}