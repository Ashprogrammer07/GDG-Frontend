import todoReducer from "./slices/todoSlice";
const {configureStore,combineReducers} = require('@reduxjs/toolkit');

const reducer=combineReducers({
    todoState:todoReducer,
})
const store=configureStore({
    reducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
})
export default store;
