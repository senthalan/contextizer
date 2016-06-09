import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {Tabs, Tab, FontIcon} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./Main.scss');

import MediaUserStore from './stores/MediaUserStore';
import MediaHomeContainer from './containers/MediaHomeContainer'
import MediaSettingsContainer from './containers/MediaSettingsContainer'
import MediaLogin from './components/MediaLogin'


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = MediaUserStore.getState();
    }

    componentDidMount() {
        MediaUserStore.listen((state) => this.onChange(state));
    }

    componentWillUnmount() {
        MediaUserStore.unlisten((state) => this.onChange(state));
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    (
                        <Tabs
                            initialSelectedIndex={0}>
                            <Tab
                                icon={<FontIcon className="fa fa-home fa-2x"></FontIcon>}
                                label={this.state.media.name}
                                selected={true}>
                                <MediaHomeContainer/>
                            </Tab>
                            <Tab
                                icon={<FontIcon className="fa fa-cogs fa-2x"></FontIcon>}
                                label="SETTINGS">
                                <MediaSettingsContainer/>
                            </Tab>
                        </Tabs>

                    )
                    :
                    (
                        <MediaLogin
                            mediaState={this.state.mediaState}
                        />
                    )
                }

            </div>
        )
    }
}

export default Main;