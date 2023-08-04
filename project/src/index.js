import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import ServicePosts from "./services/service-posts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { PostsProvider } from "./components/context";
import store from "./store";

const servicePosts = new ServicePosts();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <PostsProvider value={servicePosts}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PostsProvider>
        </ErrorBoundary>
    </Provider>
);
