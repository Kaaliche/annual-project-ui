import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Chat/bubble';
import Input from './Chat/input';
import { requestServer } from "../ProcessComAPI";

import axios from 'axios';

class Chat extends Component {

    static propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        startListening : PropTypes.func,
        stopListening : PropTypes.func,
        browserSupportsSpeechRecognition: PropTypes.bool,
        onSearch: PropTypes.func.isRequired,
    };

    state = {
        message: null,
        messages: [],
        userMessage: "",
        recording: false,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({userMessage: nextProps.transcript});
    };

    getTextArea = (text) => {
        this.setState({userMessage: text});
    };

    handleSubmit = (e) => {
    };

    render() {

        const { messages, userMessage, recording } = this.state;
        const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

        return (
            <div className="Content" ref={(el) => { this.messagesEnd = el; }}>
                <section className='userSec'>
                    <div className='active'>
                        <img src="/public/picto.png"/>
                    </div>
                    <Bubble type='bot' text='Bonjour, je suis le Process Com Bot !' />
                </section>
                {messages.length > 0 && messages.map( msg => {
                    return(
                        <section key={msg.key} className='userSec'>
                            <div className={ msg.type === 'user' ? 'hidden' : 'active' }>
                                <img src="/public/picto.png"/>
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
