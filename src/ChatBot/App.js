import React, { Component } from 'react';
import Chat from './Chat';
import Logo from './Logo';


class App extends Component {

    state = {
        feeling: null,
        displayMenuBool: false,
    };

    displayMenu = () => {
        this.setState({
            displayMenuBool: !this.state.displayMenuBool
        })
    };


    onSearch = (type, name) => {
        let result = null;
        if (type === 'feeling') {
            result = name;
            this.setState({
                feeling: result,
            });
        }
        return result;
    };

    render() {

        const { displayMenuBool } = this.state;
        return (
            <div className="App">
                <Chat onSearch={this.onSearch} displayMenu={this.displayMenu} />
            </div>
        );
    }
}
export default App;
