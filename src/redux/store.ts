import { createStore, combineReducers } from "redux"

import langReducer from "./reducers/langReducer"

const rootReducer = combineReducers({
	language: langReducer,
})

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
