import React, {Component} from 'react'
import AltContainer from 'alt-container';

import MediaUserStore from './../stores/MediaUserStore'
import MediaUserActions from './../actions/MediaUserActions'
import { browserHistory } from 'react-router';

import { FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton, Dialog, FlatButton} from 'material-ui'

class MediaLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            registerOpen: false,
            registerOkay: false,
            error: {
                email: '',
                name: '',
                password: '',
                conformPassword: '',
                accessToken: ''
            }
        };
    }

    login() {
        var media = {
            contactPersonEmail: this.refs.mediaEmail.getValue(),
            password: this.refs.loginpassword.getValue()
        };
        MediaUserActions.login(media);
    }

    approve() {
        if (!this.refs.accessToken.getValue()) {
            this.state.error.accessToken = 'Please paste access token';
        }
        else {
            this.state.error.accessToken = '';
            localStorage.setItem("Authorization", this.refs.accessToken.getValue());
            var media = JSON.parse(localStorage.getItem('media'));
            console.log("media form local storage " + media.contactPersonEmail);
            MediaUserActions.refresh(media);
        }
        this.forceUpdate();
    }

    resendToken(){
        var media = JSON.parse(localStorage.getItem('media'));
        MediaUserActions.resendToken(media);
    }

    registerOpen() {
        this.setState({registerOpen: true});
    }


    registerClose() {
        this.setState({registerOpen: false});
    }

    registerUser() {
        if (!this.refs.email.getValue()) {
            this.state.error.email = 'Please enter email';
            this.state.registerOkay = false;
        } else {
            this.state.error.email = '';
            this.state.registerOkay = true;
        }
        if (!this.refs.name.getValue()) {
            this.state.error.name = 'Please enter name';
            this.state.registerOkay = false;
        } else {
            this.state.error.name = '';
            this.state.registerOkay = true;
        }
        if (!this.refs.password.getValue()) {
            this.state.error.password = 'Please enter password';
            this.state.registerOkay = false;
        } else {
            this.state.error.password = '';
            this.state.registerOkay = true;
        }
        if (!this.refs.passConform.getValue()) {
            this.state.error.passConform = 'Please re-enter password';
            this.state.registerOkay = false;
        } else {
            this.state.error.passConform = '';
            this.state.registerOkay = true;
        }
        if (!(this.refs.passConform.getValue() == this.refs.password.getValue())) {
            this.state.error.password = 'Password not matched';
            this.state.error.passwConform = 'Password not matched';
            this.state.registerOkay = false;
        } else {
            this.state.error.password = '';
            this.state.error.passConform = '';
            this.state.registerOkay = true;
        }
        var media = {
            name: this.refs.name.getValue(),
            contactPersonEmail: this.refs.email.getValue(),
            password: this.refs.password.getValue()
        };
        if (this.state.registerOkay) {
            console.log('media register');
            MediaUserActions.submitRegister(media);
            //this.forceUpdate();
        }
        this.forceUpdate();
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 margin-top-80 text-center">
                        <h2>Media Login</h2>
                        {this.props.mediaState.isFailed() &&
                        (
                            <div>
                                <div className="alert alert-danger">
                                    {this.props.mediaState.message}
                                </div>

                                {(this.props.mediaState.message == "media not approved") &&
                                (
                                    <div>
                                            An access token sent to your media email <br/>
                                            Please paste it here to get access..<br/>
                                        <TextField
                                            ref="accessToken"
                                            floatingLabelText="Access Token"
                                            errorText={this.state.error.accessToken}/>
                                        <br/>
                                        <div className="margin-top-40">
                                            <RaisedButton label="Approve"
                                                          primary={true}
                                                          onClick={this.approve.bind(this)}/>
                                        </div>
                                        <br/>
                                        <a  onClick={this.resendToken.bind(this)}>Click here</a> to resent the access Code<br/>
                                    </div>
                                )}
                            </div>
                        )

                        }

                        {this.props.mediaState.isLoading() &&
                        (
                            <span>
                                <div className="la-ball-scale-multiple la-3x la-top-40">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {this.props.mediaState.message}
                            </span>
                        )
                        }
                        {(!this.props.mediaState.isLoading() && !(this.props.mediaState.message == "media not approved") ) &&
                        (
                            <div>
                                <TextField
                                    ref="mediaEmail"
                                    floatingLabelText="Media email"/>
                                <br/>

                                <TextField
                                    ref="loginpassword"
                                    floatingLabelText="Password" type="password"/>
                                <br/>
                                <div className="margin-top-40">
                                    <RaisedButton label="Login"
                                                  primary={true}
                                                  onClick={this.login.bind(this)}/>

                                    <div className="margin-top-40">
                                        <RaisedButton
                                            label="Register Media"
                                            onTouchTap={this.registerOpen.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>

                <Dialog
                    title="Register media"
                    open={this.state.registerOpen && ! this.props.mediaRegisterState.isSuccess() || this.props.mediaRegisterState.isLoading()}
                    modal={false}
                    onRequestClose={this.registerClose.bind(this)}
                >
                    <div className="row">
                        {this.props.mediaRegisterState.isLoading() &&
                        (
                            <span>
                                <div className="la-ball-scale-multiple la-3x la-top-40">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="col-md-12 text-center">
                                    {this.props.mediaRegisterState.message}
                                </div>
                            </span>
                        )
                        }
                        {!this.props.mediaRegisterState.isLoading() &&
                        (
                            <div className="col-md-12 text-center">
                                <TextField
                                    floatingLabelText="Media email"
                                    ref="email"
                                    type="email"
                                    errorText={this.state.error.email}
                                /><br/>
                                <TextField
                                    floatingLabelText="Media Name"
                                    ref="name"
                                    type="name"
                                    errorText={this.state.error.name}
                                /><br/>
                                <TextField
                                    type="password"
                                    hintText="password"
                                    ref='password'
                                    errorText={this.state.error.password}
                                /><br/>
                                <TextField
                                    type="password"
                                    hintText="Conform New password"
                                    ref='passConform'
                                    errorText={this.state.error.passConform}
                                />


                                {this.props.mediaRegisterState.isFailed() &&
                                (
                                    <div className="alert alert-danger">
                                        {this.props.mediaRegisterState.message}
                                    </div>
                                )
                                }
                                <div>
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.registerClose.bind(this)}
                                    />
                                    <FlatButton
                                        label="Register Media"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.registerUser.bind(this)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default MediaLogin;