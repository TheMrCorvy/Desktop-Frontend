import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"
import themeReducer from "./reducers/themeReducer"
import drawerReducer from "./reducers/drawerReducer"
import dialogReducer from "./reducers/dialogReducer"

const rootReducer = combineReducers({
	lng: langReducer,
	theme: themeReducer,
	open: drawerReducer,
	dialogIsOpen: dialogReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
