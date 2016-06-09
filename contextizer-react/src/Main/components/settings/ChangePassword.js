import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton,
    Dialog, FlatButton} from 'material-ui';
import ContentAdd from '../../../../node_modules/material-ui/lib/svg-icons/content/add';

import MediaSettingsActions from './../../actions/MediaSettingsActions.js'

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changePasswordOpen: false,
            error: {
                oldPass: '',
                newPass: ''
            }
        };
    }

    updatePassword() {
        var passWordUpdateReq = {
            userId: this.props.media.id,
            oldPassword: this.refs.oldPass.getValue(),
            newPassword: this.refs.newPass.getValue(),
            newPasswordConfirm: this.refs.newPassConfirm.getValue()
        };
        if (!passWordUpdateReq.oldPassword) {
            this.state.error.oldPass = 'Old password is required'
        } else {
            this.state.error.oldPass = ''
        }
        if (!passWordUpdateReq.newPassword) {
            this.state.error.newPass = 'New password is required'
        } else {
            this.state.error.newPass = ''
        }
        if (!passWordUpdateReq.newPasswordConfirm) {
            this.state.error.newPass = 'Type your new password again'
        } else if (passWordUpdateReq.newPasswordConfirm != passWordUpdateReq.newPassword) {
            this.state.error.newPassConfirm = 'New password and confirm are not matching!'
        } else {
            this.state.error.newPassConfirm = ''
        }
        if (passWordUpdateReq.oldPassword &&
            passWordUpdateReq.newPassword &&
            passWordUpdateReq.newPasswordConfirm == passWordUpdateReq.newPassword) {
            MediaSettingsActions.changePassword(passWordUpdateReq);
        }
        this.forceUpdate();
    }


    passwordClose() {
        this.state.changePasswordOpen = false;
        this.forceUpdate();
    }

    passwordOpen() {
        this.state.changePasswordOpen = true;
        this.forceUpdate();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.passwordState.isSuccess()) {
            this.passwordClose();
        }
    }

    render() {
        return (
            <div>
                <div className="margin-top-20">
                    <RaisedButton
                        label="Change Password"
                        secondary={true}
                        onClick={this.passwordOpen.bind(this)}/>
                </div>

                <Dialog
                    title="Change Media password"
                    modal={false}
                    open={this.state.changePasswordOpen}
                    onRequestClose={this.passwordClose.bind(this)}
                    >
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <TextField
                                type="password"
                                hintText="Please type your old password"
                                ref='oldPass'
                                errorText={this.state.error.oldPass}
                                /><br/>
                            <TextField
                                type="password"
                                hintText="New password"
                                ref='newPass'
                                errorText={this.state.error.newPass}
                                /><br/>
                            <TextField
                                type="password"
                                hintText="Confirm New password"
                                ref='newPassConfirm'
                                errorText={this.state.error.newPassConfirm}
                                />
                        </div>

                        <div className="col-md-12 text-center">
                            {this.props.passwordState.isFailed() &&
                            (
                                <div className="alert alert-danger">
                                    {this.props.passwordState.message}
                                </div>
                            )
                            }
                            {this.props.passwordState.isLoading() &&
                            (
                                <span>
                                    <div className="la-ball-scale-multiple la-3x la-top-40">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    {this.props.passwordState.message}
                                </span>
                            )
                            }
                            {!this.props.passwordState.isLoading() &&
                            (
                                <div>
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.passwordClose.bind(this)}
                                        />
                                    <FlatButton
                                        label="Update"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.updatePassword.bind(this)}
                                        />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </Dialog>

            </div>
        )
    }
}

export default ChangePassword;