import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import { Layout } from "./components/Layout/Layout"
import { RegisterPage } from "./pages/Authorization/RegisterPage/RegisterPage"
import { LoginPage } from "./pages/Authorization/LoginPage/LoginPage"
import { useEffect } from "react"
import { useAppDispatch } from "./hooks/reduxHooks.ts"
import { checkAuth } from "./store/slices/authorization/userActions.ts"
import { RecipePage } from "./pages/RecipePage/RecipePage.tsx"
import { NewRecipePage } from "./pages/NewRecipePage/NewRecipePage.tsx"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.tsx"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/registration"
            element={
              <PrivateRoute redirect="/" authStatus="unknown">
                <RegisterPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PrivateRoute redirect="/" authStatus="unknown">
                <LoginPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route
            path="/add-new-recipe"
            element={
              <PrivateRoute>
                <NewRecipePage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
