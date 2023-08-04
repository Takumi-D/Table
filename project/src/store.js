import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redusers/reduser";

const store = configureStore({
    reducer,
    devTools: true
})

export default store;