import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import MediaHomeStore from './../stores/MediaHomeStore'
import MediaUserStore from './../stores/MediaUserStore'
import MediaHome from './../components/MediaHome'

class ApplicationContainer extends Component {


    render() {
        return (
            <AltContainer
                stores={[MediaHomeStore, MediaUserStore]}
                inject={{
                        media: function(props){
                            return MediaUserStore.getState().media;
                        },
                        newses: function(props){
                            return MediaHomeStore.getState().newses;
                        },
                        newsState: function(props){
                            return MediaHomeStore.getState().newsState;
                        },
                        publishState: function(props){
                            return MediaHomeStore.getState().publishState;
                        }
                }}>
                <MediaHome></MediaHome>
            </AltContainer>
        )
    }
}

export default ApplicationContainer;
