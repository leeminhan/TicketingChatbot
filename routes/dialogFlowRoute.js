module.exports = app => {
    
    // requests with text from bot
    app.post('/api/df_text_query', (req,res) => {
        res.send({
            "do": "text query"
        })
    })

    // requests with event from bot
    app.post('/api/df_event_query', (req,res) => {
        res.send({
            "do": "event query"
        })
    })

}