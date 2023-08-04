import React from "react";
import { PostsConsumer } from "../context"

const initServiceContext = (Wrapper) => {
    return (props) => {
        return (
            <PostsConsumer>
                {
                    (servicePosts) => {
                        return (
                            <Wrapper {...props} servicePosts={ servicePosts }/>
                        )
                    }
                }
            </PostsConsumer>
        )
    }
}

export default initServiceContext;