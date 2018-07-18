import { ApiAiClient } from "api-ai-javascript";

const clientToken = '751497d37d974d5f9b05c8d076c618d8';
const client = new ApiAiClient({accessToken: clientToken})

export function requestServer(query, callback){
    client
        .textRequest(query)
        .then((response) => {
            let json = JSON.stringify(response);
            callback(response);
        })
        .catch((error) => {
            console.log('Error : ' + error);
        });
}
