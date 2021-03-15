import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"
import themeReducer from "./reducers/themeReducer"
import drawerReducer from "./reducers/drawerReducer"
import authTokenReducer from "./reducers/authTokenReducer"
import errorHandlingReducer from "./reducers/errorHandlingReducer"

const rootReducer = combineReducers({
	lng: langReducer,
	theme: themeReducer,
	open: drawerReducer,
	token: authTokenReducer,
	err: errorHandlingReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
