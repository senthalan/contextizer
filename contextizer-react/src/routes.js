import React, { PropTypes, Component } from 'react';
import { Route, Redirect } from 'react-router';

import Main from './Main/Main';
import Media from './Main/Media';

export default (

    <Route>

        <Route name="home" path="/" component={Main}>
        </Route>

        <Route name="media" path="/media" component={Media}>
        </Route>

        <Redirect from="*" to="/"/>

    </Route>
);