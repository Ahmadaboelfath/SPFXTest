import IStamp from "./IStamp";

export default interface IValidator{
    validate:(value: any) => IStamp
}