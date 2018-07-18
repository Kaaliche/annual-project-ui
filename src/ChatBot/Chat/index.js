import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './bubble';
import Input from './input';
import './style.css'
import { requestServer } from "../ProcessComAPI";


class Chat extends Component {

    static propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        startListening : PropTypes.func,
        stopListening : PropTypes.func,
        onSearch: PropTypes.func.isRequired,
    };

    state = {
        message: null,
        messages: [],
        userMessage: "",
        recording: false,
    };

    componentWillReceiveProps(nextProps){
        this.setState({userMessage: nextProps.transcript});
    };

    getTextArea = (text) => {
        this.setState({userMessage: text});
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.userMessage){
            const{userMessage, messages} = this.state;
            const{onSearch} = this.props;
            let message = {content: userMessage, type: "user", key:messages.length};
            messages.push(message);
            this.setState({messages, userMessage: '', recording: false});

            let req = requestServer(userMessage, (response) => {
                const action = response.result.action;

                if(action === "action.guess.feeling" && response.result.parameters.feeling) {
                    const feeling = onSearch('feeling', response.result.parameters.feeling);
                    const messageContent = 'Le sentiment ressortant le plus est le suivant : ' + feeling.name+'.';

                    message = {content: messageContent, type: "bot", key: messages.length};
                    messages.push(message);
                    this.setState({messages});
                } else {
                    message = {content: response.result.fulfillment.speech, type: "bot", key: messages.length};
                    messages.push(message);
                    this.setState({messages});
                }
            })
        }
    };

    render(){

        const { messages, userMessage, recording } = this.state;
        const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

        return (
            <div className="Content" ref={(el) => { this.messagesEnd = el; }}>
                <section className='userSec'>
                    <div className='active'>
                        <img src="/picto.png"/>
                    </div>
                    <Bubble type='bot' text='Bonjour, je suis le Process Com Bot !' />
                </section>
                {messages.length > 0 && messages.map( msg => {
                    return(
                        <section key={msg.key} className='userSec'>
                            <div className={ msg.type === 'user' ? 'hidden' : 'active' }>
                                <img src="/picto.png"/>
                            </div>
                            <div className={ msg.type === 'user' ? 'active userCase' : 'hidden' }>
                                <i className="fa fa-user"></i>
                            </div>
                            <Bubble type={msg.type} text={msg.content} img={msg.img} />
                        </section>
                    );
                })}
                <form className='chatUser' onSubmit={this.handleSubmit}>
                    <Input value={userMessage} getTextArea={this.getTextArea}/>
                    <input type='submit' value='Envoyer'/>
                </form>
            </div>
        );
    }
}

export default Chat;