import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import UserLogin from './../components/UserLogin'
import UserSettingStore from './../stores/UserSettingsStore'

class UserSettingsContainer extends Component {

    render() {
        return (
            <AltContainer
                stores={[SettingsStore]}
                inject={{
                        basicState: function(props){
                            return UserSettingStore.getState().basicState;
                        },
                        passwordState: function(props){
                            return UserSettingStore.getState().passwordState;
                        }
                }}>
                <UserLogin></UserLogin>
            </AltContainer>
        )
    }
}

export default UserSettingsContainer;