import React from "react";

const { Provider: PostsProvider, Consumer: PostsConsumer } = React.createContext();

export {
    PostsProvider,
    PostsConsumer
}