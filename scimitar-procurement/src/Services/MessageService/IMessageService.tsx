export default interface IMessageService {
    getWelcomeMessageContent: ()=> Promise<string>;
}