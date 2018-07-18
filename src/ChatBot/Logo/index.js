import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Logo extends Component {

    static propTypes = {
        displayMenu: PropTypes.func.isRequired,
    };

    render() {

        return (
            <div className='topLogo'>
                <img className='logo' src='/picto.png'/>
                <div onClick={this.props.displayMenu} className='menuBurger'><div></div></div>
            </div>
        );
    }
}

export default Logo;
