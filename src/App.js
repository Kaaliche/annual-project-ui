import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Chat/bubble';
import Input from './Chat/input';
import { requestServer } from "./ProcessComAPI";

import axios from 'axios';

class App extends Component {

    static propTypes = {
        transcript: PropTypes.string,
        resetTranscript: PropTypes.func,
        startListening: PropTypes.func,
        stopListening: PropTypes.func,
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

    handleMicroButton = (e) => {
        e.preventDefault();

        const { startListening, stopListening } = this.props;
        const { recording } = this.state;

        if (recording) {
            stopListening();
            this.setState({
                recording: false,
            })
        } else {
            startListening();
            this.setState({
                recording: true,
            })
        }
    };

    getTextArea = (text) => {
        this.setState({userMessage: text});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.userMessage) {
            const {userMessage, messages} = this.state;
            const {onSearch, resetTranscript, stopListening} = this.props;
            let newMessage = {content: userMessage, type: "user", key: messages.length};
            messages.push(newMessage);
            resetTranscript();
            stopListening();
            this.setState({messages, userMessage: '', recording: false});

            let request = requestServer(userMessage, (response) => {

                const action = response.result.action;

                if (action === "action.guess.feeling" && response.result.parameters.title) {
                    const artist = onSearch('artist', response.result.parameters.title);
                    const messageContent = 'Cette chanson est interprétée par ' + artist.name + '.';

                    newMessage = {content: messageContent, type: "bot", key: messages.length};
                    messages.push(newMessage);
                    this.setState({messages})
                } else {
                    newMessage = {content: response.result.fulfillment.speech, type: "bot", key: messages.length};
                    messages.push(newMessage);
                    this.setState({messages})
                }
            });
        } else {
            return false;
        }
    };

    render() {

        const {messages, userMessage, recording} = this.state;
        const {transcript, resetTranscript, browserSupportsSpeechRecognition} = this.props

        return (
            <div className="Content" ref={(el) => {
                this.messagesEnd = el;
            }}>
                <section className='userSec'>
                    <div className='active'>
                        <img src="/public/picto.png"/>
                    </div>
                    <Bubble type='bot' text='Bonjour, je suis le Process Com Bot !'/>
                </section>
                {messages.length > 0 &&
                messages.map(msg => {
                    return (
                        <section key={msg.key} className='userSec'>
                            <div className={msg.type === 'user' ? 'hidden' : 'active'}>
                                <img src="/public/picto.png"/>
                            </div>
                            <div className={msg.type === 'user' ? 'active userCase' : 'hidden'}>
                                <i className="fa fa-user"></i>
                            </div>
                            <Bubble type={msg.type} text={msg.content} img={msg.img}/>
                        </section>
                    );
                })}
                <form className='chatUser' onSubmit={this.handleSubmit}>
                    <Input value={userMessage} getTextArea={this.getTextArea}/>
                    <input type='submit' value='Envoyer'/>
                    <button className={recording ? 'onRecord' : 'offRecord'} onClick={this.handleMicroButton}><i className="fa fa-microphone"></i></button>
                </form>
            </div>
        );
    }
}
export default App;

