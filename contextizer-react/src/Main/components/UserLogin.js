import React, {Component} from 'react'
import AltContainer from 'alt-container';

import UserStore from './../stores/UserStore'
import UserAction from './../actions/UserActions'

import { browserHistory } from 'react-router';

import { Card, FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton, Dialog, FlatButton} from 'material-ui'

var isValidEmail = require('is-valid-email');


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            registerOpen: false,
            registerOkay: false,
            error: {
                name: '',
                password: '',
                conformPassword: ''
            }
        };
    }

    login() {
        var user = {
            email: this.refs.userEmail.getValue(),
            password: this.refs.password.getValue()
        };
        UserAction.login(user);
    }

    registerOpen() {
        this.setState({registerOpen: true});
    }


    registerClose() {
        this.setState({registerOpen: false});
        this.state.registerOkay = false;
        this.state.error.name = '';
        this.state.error.password = '';
        this.state.error.passConform = '';
    }

    registerUser() {
        if (!this.refs.email.getValue()) {
            this.state.error.name = 'Please enter email';
            this.state.registerOkay = false;
        } else {
            this.state.error.name = '';
            this.state.registerOkay = true;
        }
        if (this.state.registerOkay){
            if (!isValidEmail(this.refs.email.getValue())){
                this.state.error.name = 'Not a valid email';
                this.state.registerOkay = false;
            } else {
                this.state.error.name = '';
                this.state.registerOkay = true;
            }
        }
        if (this.state.registerOkay){
            if (!this.refs.password.getValue()) {
                this.state.error.password = 'Please enter password';
                this.state.registerOkay = false;
            } else {
                this.state.error.password = '';
                this.state.registerOkay = true;
            }
        }
        if (this.state.registerOkay){
            if (!this.refs.passConform.getValue()) {
                this.state.error.passConform = 'Please re-enter password';
                this.state.registerOkay = false;
            } else {
                this.state.error.passConform = '';
                this.state.registerOkay = true;
            }
        }
        if (this.state.registerOkay){
            if (!(this.refs.passConform.getValue() == this.refs.password.getValue())) {
                this.state.error.password = 'Password not matched';
                this.state.error.passwConform = 'Password not matched';
                this.state.registerOkay = false;
            } else {
                this.state.error.password = '';
                this.state.error.passConform = '';
                this.state.registerOkay = true;
            }
        }

        var user = {
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue()
        };
        this.forceUpdate();
        console.log(this.state.registerOkay);
        if (this.state.registerOkay) {
            UserAction.submitRegister(user);
            this.forceUpdate();
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 margin-top-80 text-center">
                        <h2>contextizer User</h2>

                        {this.props.userState.isLoading() &&
                        (
                            <span>
                                <div className="la-ball-scale-multiple la-3x la-top-40">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {this.props.userState.message}
                            </span>
                        )
                        }
                        {!this.props.userState.isLoading() &&
                        (
                            <div>
                                <TextField
                                    id="userEmail"
                                    ref="userEmail"
                                    type="email"
                                    floatingLabelText="User email"/>
                                <br/>

                                <TextField
                                    id="userPassword"
                                    ref="password"
                                    floatingLabelText="Password"
                                    type="password"/>
                                <br/>

                                {this.props.userState.isFailed() &&
                                (
                                    <div className="alert alert-danger">
                                        {this.props.userState.message}
                                    </div>
                                )
                                }

                                <div className="margin-top-40">
                                    <RaisedButton label="Login"
                                                  id="userLogin"
                                                  primary={true}
                                                  onClick={this.login.bind(this)}/>
                                </div>
                                <div className="margin-top-40">
                                    <RaisedButton
                                        id="registerUser"
                                        label="Register User"
                                        onTouchTap={this.registerOpen.bind(this)}
                                    />
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>


                <Dialog
                    title="Register User"
                    open={this.state.registerOpen}
                    modal={false}
                    autoScrollBodyContent={true}
                    onRequestClose={this.registerClose.bind(this)}
                >
                    <div className="row">
                        {this.props.userRegisterState.isLoading() &&
                        (
                            <span>
                                <div className="la-ball-scale-multiple la-3x la-top-40">
                                </div>
                                {this.props.userRegisterState.message}
                            </span>
                        )
                        }
                        {!this.props.userRegisterState.isLoading() &&
                        (
                            <div className="col-md-12 text-center">
                                <TextField
                                    floatingLabelText="User email"
                                    id="email"
                                    ref="email"
                                    type="email"
                                    errorText={this.state.error.name}
                                /><br/>
                                <TextField
                                    id="password"
                                    type="password"
                                    hintText="password"
                                    ref='password'
                                    errorText={this.state.error.password}
                                /><br/>
                                <TextField
                                    id="passConform"
                                    type="password"
                                    hintText="Conform New password"
                                    ref='passConform'
                                    errorText={this.state.error.passConform}
                                />


                                {this.props.userRegisterState.isFailed() &&
                                (
                                    <div className="alert alert-danger">
                                        {this.props.userRegisterState.message}
                                    </div>
                                )
                                }
                                <div>
                                    <FlatButton
                                        id="later"
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.registerClose.bind(this)}
                                    />
                                    <FlatButton
                                        id="registerSubmit"
                                        label="Register User"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.registerUser.bind(this)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog>
                <div className="col-md-8 col-md-offset-2 modal-footer margin-top-40">
                    <label id="copyright">all rights received</label>
                </div>
            </div>

        )
    }
}

export default UserLogin;