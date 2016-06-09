import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card, CardHeader, CardTitle, CardText,CardActions,
    FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton,
    Dialog, FlatButton, Snackbar} from 'material-ui';

import ContentAdd from '../../../node_modules/material-ui/lib/svg-icons/content/add';
import NewsFirst from '../../../node_modules/material-ui/lib/svg-icons/av/fast-rewind';
import NewsLast from '../../../node_modules/material-ui/lib/svg-icons/av/fast-forward'
import NewsNext from '../../../node_modules/material-ui/lib/svg-icons/av/skip-next';
import NewsBack from '../../../node_modules/material-ui/lib/svg-icons/av/skip-previous';

import MediaHomeActions from './../actions/MediaHomeActions';
import MediaUserActions from './../actions/MediaUserActions';

var moment = require('moment');


class MediaHome extends Component {


    constructor(props) {
        super(props);
        this.skip = 0;
        this.state = {
            publishOpen: false,
            settingOpen: false,
            tags: [],
            error: {
                text: '',
                description: '',
                link: ''
            }
        };
    }


    settingOpen() {
        this.setState({settingOpen: true});
    }


    settingClose() {
        this.setState({settingOpen: false});
    }


    publishOpen() {
        this.setState({publishOpen: true, tags: []});
    }


    publishClose() {
        this.setState({publishOpen: false});
    }


    componentDidMount() {
        var req = {mediaId: this.props.media.name};
        setTimeout(MediaHomeActions.getAllNewses.bind(this, req), 0);
        clearInterval(this.pollInterval);
        this.pollInterval = setInterval(MediaHomeActions.getAllNewses.bind(this, {mediaId: this.props.media.name}), 15000);
    }

    componentWillUnmount() {
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
            media: this.props.media.name,
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

    newsBackward() {
        if (this.skip > 0) {
            this.skip = this.skip - 1;
            var req = {
                "userId": this.props.user.id,
                "mediaId": this.state.selectedMedia,
                "tag": this.state.selectedTag,
                "skip": this.skip
            };
            UserHomeActions.getAllNewses(req);
        }
    }

    newsForward() {
        if (this.skip < this.props.newses.totalPages - 1) {
            this.skip = this.skip + 1;
            var req = {
                "mediaId": this.props.media.name,
                "skip": this.skip
            };
            MediaHomeActions.getAllNewses(req);
        }
    }

    newsFirst() {
        if (this.skip > 0) {
            this.skip = 0;
            var req = {
                "mediaId": this.props.media.name,
                "skip": this.skip
            };
            MediaHomeActions.getAllNewses(req);
        }
    }

    newsLast() {
        if (this.skip < this.props.newses.totalPages - 1) {
            this.skip = this.props.newses.totalPages - 1;
            var req = {
                "mediaId": this.props.media.name,
                "skip": this.skip
            };
            MediaHomeActions.getAllNewses(req);
        }
    }

    render() {
        return (
            <div>


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
                            modal={true}
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
                        {this.props.newses.content.map((news) => {
                                return (
                                    <Card className="col-md-8 col-md-offset-2 margin-top-20">
                                        <div className="col-md-12 margin-top-10">
                                            <h4>
                                                {news.text}
                                            </h4>
                                        </div>
                                        <div className="col-md-12 margin-top-10">
                                            {news.description}
                                            <div className="margin-top-10 ">

                                                        <span>
                                                        <span
                                                            className="label label-default"> {news.tags}</span>&nbsp;&nbsp;
                                                    </span>
                                            </div>
                                        </div>
                                        <div className="col-md-12 margin-top-10 ">
                                            <i className="fa fa-globe"/>
                                            <a href={news.link} target="new">{news.link}</a>
                                        </div>
                                    </Card>
                                )
                            }
                        )
                        }
                    </div>

                    {!this.props.newsState.isFailed() &&
                    (
                        <div className="col-md-8 col-md-offset-2 page-number">

                            <NewsFirst onTouchTap={this.newsFirst.bind(this)}></NewsFirst>
                            <NewsBack onTouchTap={this.newsBackward.bind(this)}></NewsBack>
                            &nbsp;<label> {this.props.newses.number + 1}
                            of {this.props.newses.totalPages} </label>&nbsp;
                            <NewsNext onTouchTap={this.newsForward.bind(this)}></NewsNext>
                            <NewsLast onTouchTap={this.newsLast.bind(this)}></NewsLast>
                        </div>
                    )
                    }


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