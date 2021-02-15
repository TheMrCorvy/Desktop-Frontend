import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"
import themeReducer from "./reducers/themeReducer"
import drawerReducer from "./reducers/drawerReducer"

const rootReducer = combineReducers({
	lng: langReducer,
	theme: themeReducer,
	open: drawerReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
