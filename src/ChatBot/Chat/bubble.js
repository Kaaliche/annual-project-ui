import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bubble extends Component {

    static propTypes = {
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        img: PropTypes.string,
    };

    render() {

        const { text, type, img } = this.props;

        return (
            <div>
                {img &&
                (<span className={ type === 'user' ? 'user' : 'bot' }><img className='imgBubble' src={img} /></span>)
                }
                {!img &&
                (<span className={ type === 'user' ? 'user' : 'bot' }>{ text }</span>)
                }
            </div>
        );
    }
}

export default Bubble;