import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import UserHomeStore from './../stores/UserHomeStore'
import UserStore from './../stores/UserStore'
import UserHome from './../components/UserHome'

class UserApplicationContainer extends Component {


    render() {
        return (
            <AltContainer
                stores={[UserHomeStore,UserStore]}
                inject={{
                        newses: function(props){
                            return UserHomeStore.getState().newses;
                        },
                        relatedNewsRes: function(props){
                            return UserHomeStore.getState().relatedNewsRes;
                        },
                        relatedNewsState: function(props){
                            return UserHomeStore.getState().relatedNewsState;
                        },
                        tags: function(props){
                            return UserHomeStore.getState().tags;
                        },
                        user: function(props){
                            return UserStore.getState().user;
                        },
                        medias: function(props){
                            return UserHomeStore.getState().medias;
                        },
                        newsState: function(props){
                            return UserHomeStore.getState().newsState;
                        }
                }}>
                <UserHome></UserHome>
            </AltContainer>
        )
    }
}

export default UserApplicationContainer;
