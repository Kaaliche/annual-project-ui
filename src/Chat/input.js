import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

    static propTypes = {
        getTextArea: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired
    };

    handleChange = (event) => {
        this.props.getTextArea(event.target.value);
    };

    render() {

        return (
            <input className="Input" type="text" value={this.props.value} onChange={ this.handleChange } placeholder="Dites moi quelque chose !" />
        );
    }
}
export default Input;