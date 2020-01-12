import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout'

import { Provider } from 'react-redux';
import reducer from '../reducers';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

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
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];

    // 배포할 때에는 devtools를 사용하지 않아야 하기 때문에 env.NODE_ENV를 통해 배포용인지 확인
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );

    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
})(NodeBird);