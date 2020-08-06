'use strict'
const dialogflow = require('dialogflow');
const structjson = require('structjson');
const config = require("../config/keys")

const projectId = config.googleProjectId;
const sessionId = config.googleSessionId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({projectId: projectId, credentials: credentials});
// const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);


const textQuery = async (text, userID,parameters) => {

  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
  
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
const eventQuery = async (event, userID, parameters) => {

  let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
  
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