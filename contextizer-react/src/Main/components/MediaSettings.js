import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton,
    Dialog, FlatButton, Snackbar} from 'material-ui';
import ContentAdd from '../../../node_modules/material-ui/lib/svg-icons/content/add';


import Basic  from './settings/Basic'
import ChangePassword  from './settings/ChangePassword.js'
import RssConfig  from './settings/RssConfig.js'
import MediaUserActions from './../actions/MediaUserActions';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logoutOpen: false
        }
    }

    logoutOpen() {
        this.setState({logoutOpen: true});
    }


    logoutClose() {
        this.setState({logoutOpen: false});
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-md-8 margin-top-20">
                       <Basic {...this.props}/>
                    </div>

                    <div className="col-md-4 margin-top-20">
                        <Card className="col-md-12 padding-20 other-settings">
                            <h4>OTHER SETTINGS</h4>

                            <div className="col-md-12">

                                <RaisedButton
                                    label="log out"
                                    secondary={true}
                                    onTouchTap={this.logoutOpen.bind(this)}>
                                </RaisedButton>

                                <br/>

                                <ChangePassword {...this.props}/>



                            </div>
                        </Card>
                    </div>


                    <div className="col-md-12 margin-top-20">
                            <RssConfig {...this.props}/>
                    </div>

                </div>


                <Dialog
                    title="Confirm Logout"
                    actions={[
                              <FlatButton
                                label="Later"
                                secondary={true}
                                onTouchTap={this.logoutClose.bind(this)}
                              />,
                              <FlatButton
                                label="Logout"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={MediaUserActions.logout}
                              />
                            ]}
                    modal={true}
                    open={this.state.logoutOpen}
                    onRequestClose={this.logoutClose.bind(this)}
                >
                    Are you sure want to logout?
                </Dialog>

                <Snackbar
                    open={this.props.passwordState.isSuccess()}
                    message={this.props.passwordState.message}
                    autoHideDuration={3000}
                    />

                <Snackbar
                    open={this.props.basicState.isSuccess()}
                    message={this.props.basicState.message}
                    autoHideDuration={3000}
                    />

                <Snackbar
                    open={this.props.rssState.isSuccess()}
                    message={this.props.rssState.message}
                    autoHideDuration={3000}
                    />
            </div>
        )
    }
}

export default Settings;