import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout'
import { Provider } from 'react-redux';
import reducer from '../reducers';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';

const NodeBird = ({ Component, store }) => {
    return(
        <Provider store = {store}>
            <Head>
                <title>NodeBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </Provider>
    );
};

NodeBird.propTypes = {
    Component : PropTypes.elementType,
    store: PropTypes.object,
}

export default withRedux((initialState, options) => {
    // 여기에다가 store 커스터마이징
    const middlewares = [];
    //const enhancer = compose(applyMiddleware(...middlewares));

    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ != 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );

    const store = createStore(reducer, initialState, enhancer);

    return store;
})(NodeBird);