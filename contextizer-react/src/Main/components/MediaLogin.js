import React, {Component} from 'react'
import AltContainer from 'alt-container';

import MediaUserStore from './../stores/MediaUserStore'
import MediaUserActions from './../actions/MediaUserActions'
import { browserHistory } from 'react-router';

import { FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton} from 'material-ui'

class MediaLogin extends Component {

    login() {
        var media = {
            name: this.refs.mediaName.getValue(),
            password: this.refs.password.getValue()
        };
        MediaUserActions.login(media);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 margin-top-80 text-center">
                        <h2>Media Login</h2>
                        {this.props.mediaState.isFailed() &&
                        (
                            <div className="alert alert-danger">
                                {this.props.mediaState.message}
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
                        {!this.props.mediaState.isLoading() &&
                        (
                            <div>
                                <TextField
                                    ref="mediaName"
                                    floatingLabelText="Media name"/>
                                <br/>

                                <TextField
                                    ref="password"
                                    floatingLabelText="Password" type="password"/>
                                <br/>
                                    <div className="margin-top-40">
                                    <RaisedButton label="Login"
                                                  primary={true}
                                                  onClick={this.login.bind(this)}/>
                                    </div>
                            </div>
                        )
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default MediaLogin;