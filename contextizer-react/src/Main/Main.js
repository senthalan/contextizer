import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {Tabs, Tab, FontIcon} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./Main.scss');

import UserStore from './stores/UserStore';
import UserHomeContainer from './containers/UserHomeContainer'
import UserLogin from './components/UserLogin'


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
    }

    componentDidMount() {
        UserStore.listen((state) => this.onChange(state));
    }

    componentWillUnmount() {
        UserStore.unlisten((state) => this.onChange(state));
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    (
                            <UserHomeContainer/>
                    )
                    :
                    (
                        <UserLogin
                            userState={this.state.userState}
                        />
                    )
                }

            </div>
        )
    }
}

export default Main;