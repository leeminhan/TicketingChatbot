const express = require('express');
const router = new express.Router();
const dialogflow = require('dialogflow');
const config = require("../config/keys")

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

module.exports = app => {

    // requests with text from bot (frontend)
    app.post('/api/df_text_query', async(req,res) => {
        
        console.log(req.body.text)

        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },
          };


        let responses = await sessionClient.detectIntent(request)
        console.log(responses)
        
        res.send(responses[0].queryResult)
    })

    // requests with event from bot
    app.post('/api/df_event_query', (req,res) => {
        res.send({
            "do": "event query"
        })
    })

}

// requests with text from bot (frontend)
// router.post('/api/df_text_query', async(req,res) => {
    
//     console.log(req.body.text)

//     const request = {
//         session: sessionPath,
//         queryInput: {
//             text: {
//             // The query to send to the dialogflow agent
//             text: req.body.text,
//             // The language used by the client (en-US)
//             languageCode: config.dialogFlowSessionLanguageCode,
//             },
//         },
//         };


//     let responses = await sessionClient.detectIntent(request)
//     console.log(responses)
    
//     res.send(responses[0].queryResult)
// })

// // requests with event from bot
// router.post('/api/df_event_query', (req,res) => {
//     res.send({
//         "do": "event query"
//     })
// })

// module.exports = router;