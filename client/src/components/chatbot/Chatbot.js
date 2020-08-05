import React, {Component} from 'react';
import axios from 'axios';

import Message from './Message';

class Chatbot extends Component {

    messagesEnd;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
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

    // when component has been rendered to the DOM
    componentDidMount() {
        this.df_event_query('welcome') //welcome eventQuery
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    

    renderMessages(stateMessages) {
        if(stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks= {message.speaks} text={message.msg.text.text} />
            })
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if(e.key == 'Enter'){
            this.df_text_query(e.target.value)
            e.target.value = ''
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
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => {this.messagesEnd =el}} 
                        style={{float:'left', clear: 'both'}}>
                    </div>
                    <input type="text" onKeyPress={this._handleInputKeyPress}/>
                </div>

            </div>
        )
    }
    
}

export default Chatbot;