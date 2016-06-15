import  React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card,
    FontIcon, Snackbar,DropDownMenu, MenuItem,FloatingActionButton,Dialog,FlatButton} from 'material-ui';
import {Checkbox} from 'material-ui';

import ContentSetting from '../../../node_modules/material-ui/lib/svg-icons/av/playlist-add';
import NewsFirst from '../../../node_modules/material-ui/lib/svg-icons/navigation/first-page';
import NewsLast from '../../../node_modules/material-ui/lib/svg-icons/navigation/last-page'
import NewsNext from '../../../node_modules/material-ui/lib/svg-icons/navigation/chevron-right';
import NewsBack from '../../../node_modules/material-ui/lib/svg-icons/navigation/chevron-left';


import UserHomeActions from './../actions/UserHomeActions';
import UserActions from './../actions/UserActions';

var moment = require('moment');

String.prototype.toProperCase = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


class UserHome extends Component {


    constructor(props) {
        super(props);
        this.skip = 0;
        this.state = {
            selectedMedia: "",
            selectedTag: "",
            logoutOpen: false,
            subscribeOpen: false,
            settingOpen: false
        };

    }

    componentDidMount() {
        setTimeout(UserHomeActions.getAllMedia.bind(this, this.props.user), 0);
        setTimeout(UserHomeActions.getAllNewses.bind(this, {userId: this.props.user.id}), 0);
        setTimeout(UserHomeActions.getAllTags.bind(this), 0);

    }

    settingOpen() {
        this.setState({settingOpen: true});
    }


    settingClose() {
        this.setState({settingOpen: false});
    }

    logoutOpen() {
        this.setState({logoutOpen: true});
    }


    logoutClose() {
        this.setState({logoutOpen: false});
    }


    subscribeOpen() {
        this.subscribeList = new Array(this.props.medias.length);
        console.log(this.props.medias.length);
        this.subscribeLength = this.props.user.subscriptions.length;
        var i = 0;
        this.props.user.subscriptions.map((media) => {
            this.subscribeList.fill(media, i, i + 1);
            i = i + 1;
        });
        console.log(this.subscribeList);
        this.setState({subscribeOpen: true});
    }


    subscribeClose() {
        this.setState({subscribeOpen: false});
    }

    componentWillUnmount() {
        clearInterval(this.pollInterval)
    }

    poll() {

    }


    handleChange(event, index, val) {
        this.setState({selectedMedia: val});
        this.skip = 0;
        var req = {"userId": this.props.user.id, "mediaId": val, "tag": this.state.selectedTag};
        UserHomeActions.getAllNewses(req);
    }

    sortNews(event, index, t) {
        this.setState({selectedTag: t});
        this.skip = 0;
        var req = {"userId": this.props.user.id, "mediaId": this.state.selectedMedia, "tag": t};
        UserHomeActions.getAllNewses(req);
    }

    handleSubscribe(event, isInputChecked) {
        var empty = "empty";
        var inList = (element, index, array) => (element === event.currentTarget.id);
        var listEmpty = (element, index, array) => (element === empty);
        console.log("clicked " + event.currentTarget.id);

        var i = this.subscribeList.findIndex(listEmpty);
        console.log("empty found " + i);
        console.log(isInputChecked);
        if (isInputChecked) {
            if (i != 0) {
                console.log("fill data without ");
                this.subscribeList.fill(event.currentTarget.id, this.subscribeLength, this.subscribeLength + 1);
            }
            else {
                console.log("fill data with replacement");
                this.subscribeList.fill(event.currentTarget.id, i, i + 1);
            }
            this.subscribeLength = this.subscribeLength + 1;
        }
        else {
            var ind = this.subscribeList.findIndex(inList);
            console.log("remove at " + ind);
            this.subscribeList.fill(empty, ind, ind + 1);
            this.subscribeLength = this.subscribeLength - 1;
        }
        console.log(this.subscribeList);

    }

    submitSubscribe() {
        var SubscriptionReq = {
            userId: this.props.user.id,
            mediaId: this.subscribeList
        };
        UserActions.submitSubscribe(SubscriptionReq);
    }

    clickMe(news) {
        var req = {"newsId": news, "userId": this.props.user.id};
        UserHomeActions.clickMe(req);
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
                "userId": this.props.user.id,
                "mediaId": this.state.selectedMedia,
                "tag": this.state.selectedTag,
                "skip": this.skip
            };
            UserHomeActions.getAllNewses(req);
        }
    }

    newsFirst() {
        if (this.skip > 0) {
            this.skip = 0;
            var req = {
                "userId": this.props.user.id,
                "mediaId": this.state.selectedMedia,
                "tag": this.state.selectedTag,
                "skip": this.skip
            };
            UserHomeActions.getAllNewses(req);
        }
    }

    newsLast() {
        if (this.skip < this.props.newses.totalPages - 1) {
            this.skip = this.props.newses.totalPages - 1;
            var req = {
                "userId": this.props.user.id,
                "mediaId": this.state.selectedMedia,
                "tag": this.state.selectedTag,
                "skip": this.skip
            };
            UserHomeActions.getAllNewses(req);
        }
    }


    render() {
        return (
            <div>

                <Dialog
                    title="Confirm Logout"
                    actions={[
                                      <FlatButton
                                        id="loginConform"
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.logoutClose.bind(this)}
                                      />,
                                      <FlatButton
                                         id="loginLater"
                                        label="Logout"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={UserActions.logout}
                                      />
                                    ]}
                    modal={false}
                    open={this.state.logoutOpen}
                    onRequestClose={this.logoutClose.bind(this)}
                >
                    Are you sure want to logout ?
                </Dialog>


                <Dialog
                    title="subscribe Details"
                    modal={false}
                    open={this.state.subscribeOpen}
                    onRequestClose={this.subscribeClose.bind(this)}
                    autoScrollBodyContent={true}
                    actions={[
                                <FlatButton
                                        id="subscribeLater"
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.subscribeClose.bind(this)}
                                      />,
                                <FlatButton
                                    id="subscribeConform"
                                    label="Update Subscribe Details"
                                    primary={true}
                                    keyboardFocused={true}
                                    onTouchTap={this.submitSubscribe.bind(this)}
                                />
                            ]}
                >
                    subscribe details

                    <div className="col-md-12">
                        {this.props.medias.map((media) => {
                            return (
                                <Checkbox className="margin-top-20" id={media.id} label={media.name}
                                          defaultChecked={media.subscribed} onCheck={this.handleSubscribe.bind(this)}/>
                            )
                        })
                        }
                    </div>

                </Dialog>

                <div className="container-fluid">
                    <div className="row">
                        <div className="media-select">
                            <DropDownMenu id="mediaDropDown" value={this.state.selectedMedia} onChange={this.handleChange.bind(this)}>
                                <MenuItem id="1" value={""} primaryText="."/>
                                <MenuItem id="1" value={""} primaryText="All News"/>
                                {this.props.medias.map((media) => {
                                    return (
                                        <MenuItem id={media.id} value={media.id} primaryText={media.name.toProperCase()}
                                                  disabled={!media.subscribed}/>
                                    )
                                })
                                }
                            </DropDownMenu>
                        </div>

                        <div className="tag-select">
                            <DropDownMenu id="tagDropDown" value={this.state.selectedTag} onChange={this.sortNews.bind(this)}>
                                <MenuItem id="1" value={""} primaryText="."/>
                                <MenuItem id="1" value={""} primaryText="All Topics"/>
                                {this.props.tags.map((tag) => {
                                    return (
                                        <MenuItem id={tag.name} value={tag.name} primaryText={tag.name}/>
                                    )
                                })
                                }
                            </DropDownMenu>
                        </div>

                        {this.props.newsState.isFailed() &&
                        (
                            <div className='col-md-8 col-md-offset-2 margin-top-20 alert alert-danger'>
                                {this.props.newsState.message}
                            </div>
                        )
                        }

                        {this.props.newses.content.map((news) => {
                                return (
                                    <div>
                                        <Card
                                            className={ news.seen ? 'col-md-8 col-md-offset-2 margin-top-20 news-card-done' :'col-md-8 col-md-offset-2 margin-top-20 '}>
                                            <a id={news.id} href={news.link} target="new" onClick={this.clickMe.bind(this, news.id)}>
                                                <div>
                                                    <div className="col-md-12 margin-top-10 news-text">
                                                        <h4>
                                                            {news.text}
                                                        </h4>
                                                    </div>
                                                    <div className="col-md-12 margin-top-10 news-description">
                                                        {news.description}
                                                        <div className="margin-top-10">
                                                        <span>
                                                            <span
                                                                className="label label-default news-tag">{news.tags}</span>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <hr/>
                                                    </div>
                                                    <div className="col-md-6 margin-10">
                                                <span
                                                    className="label label-default">{news.media}</span>&nbsp;&nbsp;
                                                        {moment(news.createdTime).format('MMM Do, h:mm A')}
                                                    </div>
                                                    <div className="col-md-6 margin-10 text-right">
                                                        <strong>{news.webReach}</strong>&nbsp;Views
                                                    </div>
                                                </div>
                                            </a>
                                            {
                                                (this.props.relatedNewsRes.newsId == news.id) &&
                                                this.props.relatedNewsRes.relatedNews.map((rnews) => {
                                                        return (
                                                            <div className="col-md-3  related-news">
                                                                <a id={"relate"+news.id} href={rnews.link} target="new">
                                                                    <Card>
                                                                        <div className="col-md-12 margin-top-10 news-text">
                                                                            <h4>
                                                                                {rnews.text} - {rnews.media}
                                                                            </h4>
                                                                        </div>
                                                                        <div
                                                                            className="col-md-12 margin-top-10 news-description-related">
                                                                            {rnews.description}
                                                                        </div>
                                                                    </Card>
                                                                </a>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }

                                        </Card>


                                    </div>
                                )
                            }
                        )
                        }

                        <div className="scrollup">
                            <div className="col-lg-1">
                                <FloatingActionButton
                                    id="logout"
                                    secondary={true}
                                    iconClassName={"fa fa-power-off"}
                                    tooltip="Log out"
                                    tooltipPosition="top"
                                    onTouchTap={this.logoutOpen.bind(this)}>
                                </FloatingActionButton>
                                <br/>
                                <br/>
                                <FloatingActionButton
                                    id="subscribe"
                                    secondary={true}
                                    iconClassName={"muidocs-icon-custom-github"}
                                    tooltip="subscribe"
                                    tooltipPosition="top"
                                    onTouchTap={this.subscribeOpen.bind(this)}>
                                    <ContentSetting />
                                </FloatingActionButton>
                            </div>
                        </div>
                    </div>

                    {!this.props.newsState.isFailed() &&
                    (
                        <div className="col-md-8 col-md-offset-2 page-number">

                        </div>
                    )
                    }


                    <div className="col-md-8 col-md-offset-2 modal-footer margin-top-40">
                        <label id="userName">loggedin</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHome;