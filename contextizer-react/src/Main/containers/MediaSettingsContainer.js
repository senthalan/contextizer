import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import MediaSettings from './../components/MediaSettings'
import MediaSettingsStore from './../stores/MediaSettingsStore'
import MediaUserStore from './../stores/MediaUserStore'

class MediaSettingsContainer extends Component {

    render() {
        return (
            <AltContainer
                stores={[MediaUserStore, MediaSettingsStore]}
                inject={{
                        media: function(props){
                            return MediaUserStore.getState().media;
                        },
                        basicState: function(props){
                            return MediaSettingsStore.getState().basicState;
                        },
                        passwordState: function(props){
                            return MediaSettingsStore.getState().passwordState;
                        },
                        rssState: function(props){
                            return MediaSettingsStore.getState().rssState;
                        }
                }}>
                <MediaSettings></MediaSettings>
            </AltContainer>
        )
    }
}

export default MediaSettingsContainer;