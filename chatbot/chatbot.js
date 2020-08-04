'use strict'
const dialogflow = require('dialogflow');
const config = require("../config/keys")

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);
const structjson = require('structjson');

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

/* EventQuery has parameters while TextQuery doesn't */
const eventQuery = async (event, parameters) => {
    const request = {
        session: sessionPath,
        queryInput: {
          event: {
            // The query to send to the dialogflow agent
            name: event,
            parameters: structjson.jsonToStructProto(parameters),
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
      };


    let responses = await sessionClient.detectIntent(request)
    console.log(responses)
    
    // note there's no S
    // response = await handleAction(responses)
    return responses;
}

module.exports = {
    textQuery: textQuery,
    eventQuery: eventQuery,
    handleAction: handleAction
}