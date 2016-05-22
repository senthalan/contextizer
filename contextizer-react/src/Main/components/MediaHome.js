import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton,
    Dialog, FlatButton, Snackbar} from 'material-ui';
import ContentAdd from '../../../node_modules/material-ui/lib/svg-icons/content/add';

import MediaHomeActions from './../actions/MediaHomeActions';
import MediaUserActions from './../actions/MediaUserActions';

var moment = require('moment');


class MediaHome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            logoutOpen: false,
            publishOpen: false,
            tags: [],
            error: {
                text: '',
                description: '',
                link: ''
            }
        };
    }

    logoutOpen() {
        this.setState({logoutOpen: true});
    }


    logoutClose() {
        this.setState({logoutOpen: false});
    }


    publishOpen() {
        this.setState({publishOpen: true, tags: []});
    }


    publishClose() {
        this.setState({publishOpen: false});
    }


    componentDidMount() {
        setTimeout(MediaHomeActions.getAllNewses.bind(this, this.props.media.name), 0);
        clearInterval(this.pollInterval);
        this.pollInterval = setInterval(MediaHomeActions.getAllNewses.bind(this, this.props.media.name), 15000);
    }

    componentWillUnmount(){
        clearInterval(this.pollInterval);
    }

    addTag(tag, event) {
        if (this.state.tags.indexOf(tag) < 0 && event.target.checked) {
            this.state.tags.push(tag);
        }
        if (!event.target.checked) {
            this.state.tags.pop(tag)
        }
    }

    publishNews() {
        var news = {
            mediaId: this.props.media.id,
            text: this.refs.text.getValue(),
            description: this.refs.description.getValue(),
            link: this.refs.link.getValue(),
            status: 'PUBLISHED',
            tags: this.state.tags
        };
        if (!news.text) {
            this.state.error.text = 'News short text is required'
        } else {
            this.state.error.text = ''
        }
        if (!news.description) {
            this.state.error.description = 'News description is required'
        } else {
            this.state.error.description = ''
        }
        if (!news.link) {
            this.state.error.link = 'News short link is required'
        } else {
            this.state.error.link = ''
        }
        this.forceUpdate();
        if (news.text && news.description && news.link) {
            MediaHomeActions.publishNews(news);
            this.publishClose();
        }
    }

    descriptionRemoveHref(description){
        var start = description.indexOf('<a ');
        var end = description.indexOf('/a>');
        if(start > -1 && end  > -1){
            description = description.substring(0, start)
        }
        return description;
    }

    render() {
        return (
            <div>
                <div className="logout-btn">
                    <FloatingActionButton
                        secondary={true}
                        iconClassName={"fa fa-power-off"}
                        tooltip="Log out"
                        tooltipPosition="top-right"
                        onTouchTap={this.logoutOpen.bind(this)}>
                    </FloatingActionButton>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1 pull-right">
                            <div className="add-news-btn">
                                <FloatingActionButton
                                    onTouchTap={this.publishOpen.bind(this)}>
                                    <ContentAdd />
                                </FloatingActionButton>
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
                            modal={false}
                            open={this.state.logoutOpen}
                            onRequestClose={this.logoutClose.bind(this)}
                            >
                            Are you sure want to logout from MyNews?
                        </Dialog>


                        <Dialog
                            title="Publish News"
                            actions={[
                              <FlatButton
                                label="Later"
                                secondary={true}
                                onTouchTap={this.publishClose.bind(this)}
                              />,
                              <FlatButton
                                label=" Publish "
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.publishNews.bind(this)}
                              />
                            ]}
                            modal={false}
                            open={this.state.publishOpen}
                            onRequestClose={this.publishClose.bind(this)}
                            >
                            <div className="row">
                                <div className="col-md-12">
                                    <TextField
                                        fullWidth={true}
                                        ref="text"
                                        floatingLabelText="News short text"
                                        errorText={this.state.error.text}
                                        /><br/>
                                    <TextField
                                        fullWidth={true}
                                        floatingLabelText="Description"
                                        ref="description"
                                        multiLine={true}
                                        rows={2}
                                        rowsMax={4}
                                        errorText={this.state.error.description}
                                        /><br/>
                                    <TextField
                                        fullWidth={true}
                                        ref="link"
                                        floatingLabelText="Link to news website"
                                        errorText={this.state.error.link}
                                        /><br/>
                                    <h5>Select Tags</h5>

                                    <div className="col-md-4">
                                        <Checkbox
                                            label="Sports"
                                            onCheck={this.addTag.bind(this, "Sports")}
                                            />
                                    </div>
                                    <div className="col-md-4">
                                        <Checkbox
                                            label="Cinema"
                                            onCheck={this.addTag.bind(this, "Cinema")}
                                            />
                                    </div>
                                    <div className="col-md-4">
                                        <Checkbox
                                            label="Tradition and Culture"
                                            onCheck={this.addTag.bind(this, "Tradition and Culture")}
                                            />
                                    </div>
                                    <div className="col-md-4">
                                        <Checkbox
                                            label="Politics"
                                            onCheck={this.addTag.bind(this, "Politics")}
                                            />
                                    </div>

                                </div>
                            </div>

                        </Dialog>

                        {this.props.publishState.isLoading() &&
                        (
                            <div className="text-center">
                                <div className="la-ball-scale-multiple la-3x">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {this.props.publishState.message}
                            </div>
                        )
                        }
                        {this.props.publishState.isFailed() &&
                        (
                            <div className="alert alert-danger">
                                {this.props.publishState.message}
                            </div>
                        )
                        }

                        {this.props.newsState.isLoading() &&
                        (
                            <div className="text-center">
                                <div className="la-ball-scale-multiple la-3x loading-absolute">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        )
                        }
                        {this.props.newses.map((news) => {
                                return (
                                    <Card className="col-md-8 col-md-offset-2 margin-top-20">
                                        <div className="col-md-12 margin-top-10">
                                            <h4>
                                                {news.text}
                                            </h4>
                                        </div>
                                        <div className="col-md-12 margin-top-10">
                                            {this.descriptionRemoveHref(news.description)}
                                            <div className="margin-top-10 ">
                                                {news.tags.map((tag) => {
                                                    return (
                                                        <span>
                                                        <span className="label label-default">{tag}</span>&nbsp;&nbsp;
                                                    </span>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12 margin-top-10 ">
                                            <i className="fa fa-globe"/>
                                            <a href={news.link} target="new">{news.link}</a>
                                        </div>
                                        <div className="col-md-12">
                                            <hr/>
                                        </div>
                                        <div className="col-md-6 margin-10">
                                            {moment(news.createdTime).format('MMM Do, h:mm A')}
                                        </div>
                                        <div className="col-md-6 margin-10 text-right">
                                            <strong>{news.webReach}</strong>&nbsp;Clicks
                                        </div>
                                    </Card>
                                )
                            }
                        )
                        }
                    </div>
                    <Snackbar
                        open={this.props.publishState.isSuccess()}
                        message={this.props.publishState.message}
                        autoHideDuration={3000}
                        />
                </div>
            </div>
        )
    }
}

export default MediaHome;