import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class Utilities {

    public static get_CurrentUser(loginName, spHttpClient: SPHttpClient, absoluteUrl) {
        const payload = JSON.stringify({ 'logonName': loginName });
        return spHttpClient.post(`${absoluteUrl}/_api/web/ensureuser`, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            },
            body: payload
        }).then((res: SPHttpClientResponse) => {
            return res.json();
        });

    }
    private static get_Items(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, filterString?: string, selectString?: string, expand?: string, order?: string) {
        const endpoint: string = `${absoluteUrl}/_api/lists/getbytitle('${listName}')/items?${filterString ? '$filter=' + filterString : ''} ${selectString ? '&$select=' + selectString : ''} ${expand ? '&$expand=' + expand : ''} ${order ? '&$order by=' + order : ''}`;
        return spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });
    }
    public static get_AllItems(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, selectString?: string[], expand?: string[], order?: string) {
        return this.get_Items(absoluteUrl, listName, spHttpClient, null, selectString && selectString.join(','), expand && expand.join(','), order);
    }

    public static get_Itemsbyfilter(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, filterString: string, selectString: string[], expand: string[], order?: string) {
        return this.get_Items(absoluteUrl, listName, spHttpClient, filterString, selectString.join(','), expand.join(','), order);
    }

    public static get_ItemById(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, itemId, selectString?: string[], expand?: string[], order?: string) {
        return this.get_Items(absoluteUrl, listName, spHttpClient, "Id eq " + itemId, selectString.join(','), expand.join(','), order);
    }

    public static update_Item(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, itemID, item, successFn?, errorFn?, __metadataType?) {
        item.__metadata = { "type": __metadataType ? __metadataType : `SP.Data.${listName}ListItem` };

        const payload = JSON.stringify(item);
        return spHttpClient.post(`${absoluteUrl}/_api/web/lists/getbytitle('${listName}')/getItemById('${itemID}')`, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': '',
                "IF-MATCH": "*",
                "X-Http-Method": "PATCH"
            },
            body: payload
        }).then((res) => {
            if (res.status === 200 || res.status === 204) {
                if (successFn)
                    successFn();
            }
            else {
                if (errorFn)
                    errorFn(res);

            }
        });

    }

    public static create_Item(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, item, successFn?, errorFn?, __metadataType?) {
        item.__metadata = { "type": __metadataType ? __metadataType : `SP.Data.${listName}ListItem` };

        const payload = JSON.stringify(item);
        return spHttpClient.post(`${absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items`, SPHttpClient.configurations.v1, {
            headers: {

                'Content-type': 'application/json;odata=verbose',
                "Accept": "application/json;odata=verbose",
                'odata-version': '',
            },
            body: payload
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                if (successFn)
                    successFn();
            }
            else {
                if (errorFn)
                    errorFn(res);
            }
        });

    }

    public static delete_Item(absoluteUrl: string, listName: string, spHttpClient: SPHttpClient, itemID, successFn?, errorFn?) {

        return spHttpClient.post(`${absoluteUrl}/_api/web/lists/getbytitle('${listName}')/getItemById('${itemID}')`, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': '',
                "IF-MATCH": "*",
                'X-HTTP-Method': 'DELETE'
            },

        }).then((res) => {
            if (res.status === 200 || res.status === 204) {
                if (successFn)
                    successFn();
            }
            else {
                if (errorFn)
                    errorFn(res);

            }
        });

    }
}