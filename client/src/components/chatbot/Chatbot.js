import React, {Component} from 'react';
import axios from 'axios';

class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    async df_text_query(queryText) {
        // messages from user
        let says = {
            speaks: "me",
            msg: {
                text: {
                    text: queryText
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]}); // adding old messages with new user messages

        const res = await axios.post('/api/df_text_query', {text: queryText})
        
        // messages from bot
        for (let msg of res.data.fulfillmentMessages) {
            
            let says = {
                speaks: "bot",
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]}) // adding old messages with new bot messages
        }

    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName})

        for (let msg of res.data.fulfillmentMessages) {
            
            let says = {
                speaks: "bot",
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]}) // adding old messages with new bot messages
        }
    }

    // Outer Div for the Chatbot frame
    // Inner Div for where all the messages will be displayed
    // overflow is for scrolling
    render() {
        return (
            <div style={{height:400, width:400, float: 'right'}}>
                <div id="chatbot" style={{height: '100%', width: '100%', overflow: 'auto'}}> 
                    <h2>Chatbot</h2>
                    <input type="text"/>
                </div>

            </div>
        )
    }
    
}

export default Chatbot;