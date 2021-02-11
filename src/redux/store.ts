import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"
import themeReducer from "./reducers/themeReducer"

const rootReducer = combineReducers({
	lng: langReducer,
	theme: themeReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
