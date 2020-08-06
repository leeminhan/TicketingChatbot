import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';

import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

class Chatbot extends Component {

    messagesEnd;

    constructor(props) {
        super(props);

        //binding necessary to make 'this' work in the callback
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickeReplyPayLoad = this._handleQuickeReplyPayLoad.bind(this);

        this.state = {
            messages: []
        }

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
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

        const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')})
        
        // messages from bot
        for (let msg of res.data.fulfillmentMessages) {
            // console.log(JSON.stringify(msg))
            let says = {
                speaks: "bot",
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]}) // adding old messages with new bot messages
        }

    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')})

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

    _handleQuickeReplyPayLoad(event, payload, text){
        // prevent default link behavior - opening a link in the href property
        event.preventDefault();
        event.stopPropagation();
        this.df_text_query(text);

    }

    renderCards(cards){
        return cards.map((card, i) => 
            <Card key={i} payload={card.structValue}/>
        )
    }

    renderOneMessage(message, i){
        
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks= {message.speaks} text={message.msg.text.text} />

        } else if (message.msg && message.msg.payload.fields.cards){
            return <div key={i}>
                <div className='card-panel grey lighten-5 z-depth-1'>
                    <div className="col s2">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                    </div>

                    <div style={{overflow: 'auto', overFlowY: 'scroll'}}>
                        <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                            {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                        </div>
                    </div>

                </div>
            </div>
        }
    }
    

    renderMessages(stateMessages) {
        if(stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i)
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
            <div style={{height:500, width:500, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgrey'}}>
            
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">ChatBot</a>
                    </div>
                </nav>
            
            
                <div id="chatbot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => {this.messagesEnd =el}} 
                        style={{float:'left', clear: 'both'}}>
                    </div>
                </div>

                <div className=" col s12" >
                    <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                </div>
                
                

            </div>
        )
    }
    
}

export default Chatbot;