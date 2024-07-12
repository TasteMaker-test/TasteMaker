import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "../../../store/slices/authorization/userSlice.ts"
import { recipeReducer } from "../../../store/slices/recipes/recipeSlice.ts"

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
