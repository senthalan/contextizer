import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton,
    Dialog, FlatButton} from 'material-ui';
import ContentAdd from '../../../../node_modules/material-ui/lib/svg-icons/content/add';

import MediaSettingsActions from './../../actions/MediaSettingsActions.js'

class RssConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editDetails: false,
            rssConfirmOpen: false,
            rssNewOpen: false,
            mediaUpdate: {},
            rssConfig: this._deepCopyRssConfigProps()
        };
    }

    editDetails() {
        this.state.editDetails = !this.state.editDetails;
        this.state.rssConfig = this._deepCopyRssConfigProps();
        this.forceUpdate();
    }


    update(rssNew) {

        var mediaUpdate = {
            id: this.props.media.id,
            rssConfig: []
        };
        var rss = {};
        for (var i = 0; i < this.state.rssConfig.length; i++) {
            rss = {};
            rss.tag = this.refs['tag-' + i].getValue();
            rss.url = this.refs['url-' + i].getValue();
            rss.pollMinutes = this.refs['pollMinutes-' + i].getValue();
            mediaUpdate.rssConfig.push(rss);
        }
        this.state.mediaUpdate = mediaUpdate;
        if (rssNew == 'new') {
            this.state.rssNewOpen = true;
        } else {
            this.state.rssConfirmOpen = true;
        }
        this.forceUpdate();
    }

    remove(index) {
        this.state.rssConfig.splice(index, 1);
        var rssConfig = JSON.parse(JSON.stringify(this.state.rssConfig));
        this.setState({rssConfig: rssConfig});
    }

    rssConfirmClose() {
        this.state.rssConfirmOpen = false;
        this.forceUpdate();
    }

    rssNewClose() {
        this.state.rssNewOpen = false;
        this.forceUpdate();
    }

    rssUpdate(rssNew) {
        var mediaUpdate = (JSON.parse(JSON.stringify(this.state.mediaUpdate)));
        if (rssNew == 'new') {
            var newsRss = {
                tag: this.refs['new-tag'].getValue(),
                url: this.refs['new-url'].getValue(),
                pollMinutes: this.refs['new-pollMinutes'].getValue()
            };
            mediaUpdate.password = this.refs['new-password'].getValue();
            mediaUpdate.rssConfig.push(newsRss);
        } else {
            mediaUpdate.password = this.refs['edit-password'].getValue();
        }
        MediaSettingsActions.rssUpdate(mediaUpdate);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rssState.isSuccess()) {
            this.rssConfirmClose();
            this.rssNewClose();
        }
        this.state.rssConfig = this._deepCopyRssConfigProps();
        this.forceUpdate();
    }

    componentDidMount() {
        this._setRssTableValues();
    }

    componentDidUpdate() {
        this._setRssTableValues();
    }

    _setRssTableValues() {
        if (this.state.rssConfig) {
            for (var i = 0; i < this.state.rssConfig.length; i++) {
                this.refs['tag-' + i].setValue(this.state.rssConfig[i].tag);
                this.refs['url-' + i].setValue(this.state.rssConfig[i].url);
                this.refs['pollMinutes-' + i].setValue(this.state.rssConfig[i].pollMinutes)
            }
        }
    }

    _deepCopyRssConfigProps() {
        if (this.props.media.rssConfig) {
            return JSON.parse(JSON.stringify(this.props.media.rssConfig));
        } else {
            return [];
        }
    }


    render() {
        return (
            <div>
                <Card className="col-md-12 padding-20">
                    <h5>
                        If your media have RSS field for tags add here.<br/>
                        If your media only a common RSS field please put "common" in tag and add the url.</h5>
                    <hr/>
                    <table className="table table-striped">

                        <thead>
                        <tr>
                            <th>TAG</th>
                            <th>RSS FEED URL</th>
                            <th>POLL TIME (mins)</th>
                            <th>
                                {!this.state.editDetails &&
                                <span>
                                <IconButton
                                    iconClassName="fa fa-light fa-pencil" tooltip="Edit Rss configurations"
                                    tooltipPosition="top-left"
                                    onClick={this.editDetails.bind(this)}
                                />
                                <IconButton iconClassName="fa fa-light fa-plus" tooltip="Add New Rss URL"
                                            tooltipPosition="top-left"
                                            onClick={this.update.bind(this, 'new')}/>
                                </span>
                                }
                                {this.state.editDetails &&
                                <span>
                                    <RaisedButton
                                        label="update"
                                        secondary={true}
                                        onClick={this.update.bind(this)}/>
                                    <IconButton
                                        iconClassName="fa fa-light fa-close"
                                        onClick={this.editDetails.bind(this)}
                                    />
                                </span>
                                }
                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.rssConfig.map((rss, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <TextField
                                            disabled={!this.state.editDetails}
                                            ref={'tag-'+ index}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            disabled={!this.state.editDetails}
                                            ref={'url-'+ index}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            disabled={!this.state.editDetails}
                                            ref={'pollMinutes-'+ index}
                                        />
                                    </td>
                                    <td>
                                        {this.state.editDetails &&
                                        <RaisedButton
                                            label="Remove"
                                            onClick={this.remove.bind(this, index)}/>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                </Card>


                <Dialog
                    title="Confirm Rss Configuration Update"
                    modal={false}
                    open={this.state.rssConfirmOpen}
                    onRequestClose={this.rssConfirmClose.bind(this)}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <TextField
                                type="password"
                                floatingLabelText="Please type your Media password"
                                ref='edit-password'
                            />
                        </div>

                        <div className="col-md-12 text-center">
                            {this.props.rssState.isFailed() &&
                            (
                                <div className="alert alert-danger">
                                    {this.props.rssState.message}
                                </div>
                            )
                            }
                            {this.props.rssState.isLoading() &&
                            (
                                <span>
                                        <div className="la-ball-scale-multiple la-3x la-top-40">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    {this.props.rssState.message}
                                </span>
                            )
                            }
                            {!this.props.rssState.isLoading() &&
                            (
                                <div className="margin-top-40">
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.rssConfirmClose.bind(this)}
                                    />
                                    <FlatButton
                                        label="Update"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.rssUpdate.bind(this)}
                                    />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </Dialog>

                <Dialog
                    title="Add New Rss URL"
                    modal={false}
                    open={this.state.rssNewOpen}
                    onRequestClose={this.rssNewClose.bind(this)}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">


                            <TextField
                                fullWidth={true}
                                floatingLabelText="RSS feed Url"
                                ref='new-url'
                            />

                            <TextField
                                floatingLabelText="RSS tag"
                                ref='new-tag'
                            />

                            <TextField
                                floatingLabelText="RSS polling time in minutes"
                                ref='new-pollMinutes'
                            /> <br/>

                            <TextField
                                type="password"
                                floatingLabelText="Please type your Media password"
                                ref='new-password'
                            />
                        </div>

                        <div className="col-md-12 text-center">
                            {this.props.rssState.isFailed() &&
                            (
                                <div className="alert alert-danger">
                                    {this.props.rssState.message}
                                </div>
                            )
                            }
                            {this.props.rssState.isLoading() &&
                            (
                                <span>
                                        <div className="la-ball-scale-multiple la-3x la-top-40">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    {this.props.rssState.message}
                                </span>
                            )
                            }
                            {!this.props.rssState.isLoading() &&
                            (
                                <div className="margin-top-40">
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.rssNewClose.bind(this)}
                                    />
                                    <FlatButton
                                        label="Add RSS"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.rssUpdate.bind(this, 'new')}
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

export default RssConfig;