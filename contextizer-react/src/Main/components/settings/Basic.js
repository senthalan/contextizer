import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton,
    Dialog, FlatButton} from 'material-ui';
import ContentAdd from '../../../../node_modules/material-ui/lib/svg-icons/content/add';

import MediaSettingsActions from './../../actions/MediaSettingsActions.js'

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDetails: false,
            editConfirmOpen: false,
            error: {
                url: '',
                contact: '',
                phone: ''
            },
            mediaUpdate: {}
        };
    }

    editDetails() {
        this.state.editDetails = !this.state.editDetails;
        this.state.error = {
            url: '',
            contact: '',
            phone: ''
        };
        this.forceUpdate();
    }

    editConfirmOpen() {
        var mediaUpdate = {
            id: this.props.media.id,
            contactPersonEmail: this.props.media.contactPersonEmail,
            webUrl: this.refs.url.getValue(),
            contactPersonName: this.refs.contact.getValue(),
            contactPersonPhone: this.refs.phone.getValue()
        };
        if (!this.validateWebUrl(mediaUpdate.webUrl)) {
            this.state.error.url = 'Media website URL is invalid'
        } else {
            this.state.error.url = ''
        }
        if (!mediaUpdate.contactPersonName) {
            this.state.error.contact = 'Contact person name is required'
        } else {
            this.state.error.contact = ''
        }
        if (!this.validatePhone(mediaUpdate.contactPersonPhone )) {
            this.state.error.phone = 'Not a valid phone number'
        } else {
            this.state.error.phone = ''
        }

        if (this.state.error.url == '' &&
            mediaUpdate.contactPersonName &&
            this.state.error.phone == '') {
            this.state.mediaUpdate = mediaUpdate;
            this.state.changePasswordOpen = true;
        }
        this.forceUpdate();

    }

    validatePhone(inputtxt)
    {
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        return (inputtxt.match(phoneno));
    }

    validateWebUrl(url){
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        return re.test(url);
    }



    editConfirmClose() {
        this.state.changePasswordOpen = false;
        this.forceUpdate();
    }

    updateBasic() {
        if (!this.refs.password.getValue()) {
            this.refs.password.focus()
        } else {
            this.state.mediaUpdate.password = this.refs.password.getValue();
            MediaSettingsActions.updateBasic(this.state.mediaUpdate);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.basicState.isSuccess()) {
            this.editConfirmClose();
        }
    }

    render() {

        return (
            <div>
                <Card className="col-md-12 padding-20">
                    <h4>BASIC DETAILS</h4>
                    {this.props.media.status == "APPROVED" && (
                            <div>
                                Please fill the basic details
                            </div>
                        )}
                    <TextField
                        disabled={true}
                        defaultValue={this.props.media.name}
                        floatingLabelText="Media Name"
                    />
                    <TextField
                        disabled={true}
                        defaultValue={this.props.media.contactPersonEmail}
                        floatingLabelText="Media email"
                    />
                    <TextField
                        defaultValue={this.props.media.webUrl}
                        floatingLabelText="Media Website URL"
                        disabled={!this.state.editDetails}
                        ref="url"
                        errorText={this.state.error.url}
                    /><br/>
                    <TextField
                        defaultValue={this.props.media.contactPersonName}
                        floatingLabelText="Contact Person Name"
                        disabled={!this.state.editDetails}
                        ref="contact"
                        errorText={this.state.error.contact}
                    />
                    <TextField
                        defaultValue={this.props.media.contactPersonPhone}
                        floatingLabelText="Contact Person TP. No."
                        disabled={!this.state.editDetails}
                        ref="phone"
                        errorText={this.state.error.phone}
                    />
                    {this.state.editDetails ?
                        (
                            <span>
                                        <RaisedButton
                                            label="update"
                                            secondary={true}
                                            onClick={this.editConfirmOpen.bind(this)}/>
                                        <IconButton
                                            iconClassName="fa fa-light fa-close" tooltip="Cancel"
                                            tooltipPosition="top-right"
                                            onClick={this.editDetails.bind(this)}
                                        />
                                    </span>
                        )
                        :
                        (
                            <IconButton
                                iconClassName="fa fa-light fa-pencil" tooltip="Edit Details"
                                tooltipPosition="top-right"
                                onClick={this.editDetails.bind(this)}
                            />
                        )
                    }
                </Card>


                <Dialog
                    title="Confirm Basic Details Update"
                    modal={false}
                    open={this.state.changePasswordOpen}
                    onRequestClose={this.editConfirmClose.bind(this)}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <TextField
                                disabled={true}
                                defaultValue={this.state.mediaUpdate.webUrl}
                                floatingLabelText="Media Web URL"
                            />
                            <TextField
                                disabled={true}
                                defaultValue={this.state.mediaUpdate.contactPersonName}
                                floatingLabelText="Contact person name"
                            />
                            <TextField
                                disabled={true}
                                defaultValue={this.state.mediaUpdate.contactPersonPhone}
                                floatingLabelText="Contact person tp No."
                            /><br/>
                            <hr/>
                            <TextField
                                type="password"
                                hintText="Please type your Media password"
                                ref='password'
                            />
                        </div>

                        <div className="col-md-12 text-center">
                            {this.props.basicState.isFailed() &&
                            (
                                <div className="alert alert-danger">
                                    {this.props.basicState.message}
                                </div>
                            )
                            }
                            {this.props.basicState.isLoading() &&
                            (
                                <span>
                                        <div className="la-ball-scale-multiple la-3x la-top-40">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    {this.props.basicState.message}
                                </span>
                            )
                            }
                            {!this.props.basicState.isLoading() &&
                            (
                                <div>
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.editConfirmClose.bind(this)}
                                    />
                                    <FlatButton
                                        label="Update"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.updateBasic.bind(this)}
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

export default Basic;