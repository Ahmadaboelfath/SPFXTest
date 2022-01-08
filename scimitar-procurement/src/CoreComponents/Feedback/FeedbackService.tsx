import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
// import Utilities from '../../DataConnectionLayer/Utilities/Utilities';
// import Utilities from '../../shared/Utilities';


export default class FeedBackService{
    
    private _context: WebPartContext;
    private _webUrl: string;

    constructor(context: WebPartContext) {
        this._context = context;
        this._webUrl = this._context.pageContext.web.absoluteUrl;
    }


    public async addFeedback(Subject: string ,MessageBody: string): Promise<boolean> {
        const feedBack = JSON.stringify({
            '__metadata': { "type": `SP.Data.MessageUsListItem` },
            Title: Subject,
            MessageBody: MessageBody,
            From:this._context.pageContext.user.email,
            SiteUrl:location.href
        });

        const response = await this._context.spHttpClient.post(`${this._webUrl}/_api/web/lists/getbytitle('MessageUs')/items`, SPHttpClient.configurations.v1, {
            headers: {

                'Content-type': 'application/json;odata=verbose',
                "Accept": "application/json;odata=verbose",
                'odata-version': '',
            },
            body: feedBack
        });

        if (response.status === 200 || response.status === 201) {
            return true;
        }
        else {
            console.log("error adding the user");
            return null;
        }

    }
}