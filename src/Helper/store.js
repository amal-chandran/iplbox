import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./../Resource";
import { createLogger } from "redux-logger";
import { authReducer } from "./../Reducers";
import thunk from "redux-thunk";
import { authActions } from "./../Actions";
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import history from "./history";
import queryString from "query-string";

const customMiddleWare = store => next => action => {
    if (action.type === "@@resource/AUTH/GET" && action.status === "resolved") {
        localStorage.setItem("authData", JSON.stringify(action.body));

        let params = (new URL(document.location)).searchParams;

        if (params.get("redirect_uri") !== null) {
            let urlDataQuery = queryString.parse(document.location.search);

            urlDataQuery['token_type'] = "Bearer";
            urlDataQuery['access_token'] = action.body.auth_token;

            let redirectParse = queryString.parseUrl(urlDataQuery.redirect_uri);

            delete urlDataQuery.redirect_uri;
            urlDataQuery = { ...redirectParse.query, ...urlDataQuery }
            urlDataQuery = queryString.stringify(urlDataQuery);

            window.location.href = redirectParse.url + "?" + urlDataQuery;
        } else {
            store.dispatch(authActions.authLogin(action.body));
            store.dispatch(push("/dashboard"));
        }

    } else if (action.type === "@@resource/AUTH/SIGNUP" && action.status === "resolved") {
        store.dispatch(authActions.authPageSet("login"));
    }
    next(action);
}


const middleware = routerMiddleware(history)

const logger = createLogger({ predicate: 'development' });

const store = createStore(
    combineReducers({ auth: Auth.rootReducer, userAuth: authReducer, router: routerReducer }),
    applyMiddleware(thunk, logger, customMiddleWare, middleware)
);

export default store;