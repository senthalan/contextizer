import React, {Component} from 'react'
import AltContainer from 'alt-container';

import {Card,
    FontIcon, Snackbar,DropDownMenu, MenuItem,FloatingActionButton,Dialog,FlatButton} from 'material-ui';
import {ContentAdd,Checkbox} from 'material-ui';

import UserHomeActions from './../actions/UserHomeActions';
import UserActions from './../actions/UserActions';

var moment = require('moment');

String.prototype.toProperCase = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


class UserHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            logoutOpen: false,
            subscribeOpen: false
        };

    }

    componentDidMount() {
        setTimeout(UserHomeActions.getAllMedia.bind(this), 0);

        if (this.pollInterval) {
            clearInterval(this.pollInterval)
        }
        this.pollInterval = setInterval(this.poll.bind(this), 15000);

        $(document).ready(function () {

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollup').fadeIn();
                } else {
                    $('.scrollup').fadeOut();
                }
            });

            $('.scrollup').click(function () {
                $("html, body").animate({scrollTop: 0}, 600);
                return false;
            });
        });
        //UserHomeActions.getAllNewses(this.props.user);
    }

    logoutOpen() {
        this.setState({logoutOpen: true});
    }


    logoutClose() {
        this.setState({logoutOpen: false});
    }


    subscribeOpen() {
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

    isSubscribe(name) {
        var ans;
        this.props.user.subscriptions.forEach(function (value) {
            if (name = value.name) {
                ans = true;
            }
            else {
                ans = false;
            }
        });
        console.log(name + " == " + ans);
        return ans;
    }


    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <div>
                    <FloatingActionButton
                        secondary={true}
                        iconClassName={"fa fa-power-off"}
                        tooltip="Log out"
                        tooltipPosition="top-left"
                        onTouchTap={this.logoutOpen.bind(this)}>
                    </FloatingActionButton>

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
                                        onTouchTap={UserActions.logout}
                                      />
                                    ]}
                            modal={false}
                            open={this.state.logoutOpen}
                            onRequestClose={this.logoutClose.bind(this)}
                        >
                            Are you sure want to logout ?
                        </Dialog>

                    <FloatingActionButton
                        secondary={true}
                        iconClassName={"muidocs-icon-custom-github"}
                        tooltip="Log out"
                        tooltipPosition="top-right"
                        onTouchTap={this.subscribeOpen.bind(this)}>
                    </FloatingActionButton>

                        <Dialog
                            title="subscribe Details"
                            modal={false}
                            open={this.state.subscribeOpen}
                            onRequestClose={this.subscribeClose.bind(this)}
                        >
                            subscribe details

                            <div className="col-md-12">

                                {this.props.medias.map((media) => {
                                    return (
                                        <Checkbox className="margin-top-20" label={this.isSubscribe(media.name)}/>
                                    )
                                })
                                }
                            </div>

                        </Dialog>

                <div className="container-fluid">
                    <div className="row">

                        <div className="media-select">
                            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
                                <MenuItem value={1} primaryText="All News"/>
                                {this.props.medias.map((media) => {
                                    return (
                                        <MenuItem value={media.name} primaryText={media.name.toProperCase()}/>
                                    )
                                })
                                }
                            </DropDownMenu>
                        </div>

                        {this.props.newses.map((news) => {
                                return (
                                    <a href={news.link} target="new">
                                        <Card
                                            className='col-md-8 col-md-offset-2 margin-top-20 news-card-done'>
                                            <div className="col-md-12 margin-top-10 news-text">
                                                <h4>
                                                    {news.text}
                                                </h4>
                                            </div>
                                            <div className="col-md-12 margin-top-10 news-description">
                                                {news.description}
                                                <div className="margin-top-10 ">
                                                    {news.tags.map((tag) => {
                                                        return (
                                                            tag !== 'common' &&
                                                            <span>
                                                                <span
                                                                    className="label label-default">{tag}</span>&nbsp;&nbsp;
                                                            </span>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <hr/>
                                            </div>
                                        </Card>
                                    </a>
                                )
                            }
                        )
                        }

                        <div className="btn btn-default scrollup">
                            <span className="text">New at top</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHome;