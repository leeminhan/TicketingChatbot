'use strict'
const dialogflow = require('dialogflow');
const config = require("../config/keys")

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

const textQuery = async (text, parameters) => {
    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: text,
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
        queryParams: {
            payload: {
                data: parameters
            }
        }
      };


    let responses = await sessionClient.detectIntent(request)
    console.log(responses)
    
    // note there's no S
    // response = await handleAction(responses)
    return responses;
}

const handleAction = (responses) => {
    return responses;
}

module.exports = {
    textQuery: textQuery,
    handleAction: handleAction
}



// module.exports = {
//     textQuery: async function(text, parameters){
//         const request = {
//             session: sessionPath,
//             queryInput: {
//               text: {
//                 // The query to send to the dialogflow agent
//                 text: text,
//                 // The language used by the client (en-US)
//                 languageCode: config.dialogFlowSessionLanguageCode,
//               },
//             },
//             queryParams: {
//                 payload: {
//                     data: parameters
//                 }
//             }
//           };

//         let responses = await sessionClient.detectIntent(request)
//         console.log(responses)

//         return responses;
//     }
// }