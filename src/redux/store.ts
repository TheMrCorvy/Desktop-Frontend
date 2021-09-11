import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"
import themeReducer from "./reducers/themeReducer"
import drawerReducer from "./reducers/drawerReducer"
import authTokenReducer from "./reducers/authTokenReducer"
import errorHandlingReducer from "./reducers/errorHandlingReducer"
import credentialReducer from "./reducers/credentialReducer"
import loadingReducer from "./reducers/loadingReducer"

const rootReducer = combineReducers({
	lng: langReducer,
	theme: themeReducer,
	open: drawerReducer,
	token: authTokenReducer,
	err: errorHandlingReducer,
	credential: credentialReducer,
	loading: loadingReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
