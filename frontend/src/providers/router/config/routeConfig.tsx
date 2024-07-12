import {
  AppRoute,
  getRouteAddNewRecipe,
  getRouteLogin,
  getRouteMain,
  getRouteRecipes,
  getRouteRegistration,
} from "../../../shared/const/route.ts"
import { HomePage } from "../../../pages/HomePage/HomePage.tsx"
import { AppRouteProps } from "../../../types/route.ts"
import { LoginPage } from "../../../pages/Authorization/LoginPage/LoginPage.tsx"
import { RegisterPage } from "../../../pages/Authorization/RegisterPage/RegisterPage.tsx"
import { RecipePage } from "../../../pages/RecipePage/RecipePage.tsx"
import { NewRecipePage } from "../../../pages/NewRecipePage/NewRecipePage.tsx"
import { NotFoundPage } from "../../../pages/NotFoundPage/NotFoundPage.tsx"

export const routeConfig: Record<AppRoute, AppRouteProps> = {
  [AppRoute.MAIN]: {
    path: getRouteMain(),
    element: <HomePage />,
  },
  [AppRoute.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoute.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <RegisterPage />,
  },
  [AppRoute.RECIPES]: {
    path: getRouteRecipes(":id"),
    element: <RecipePage />,
  },
  [AppRoute.ADD_NEW_RECIPES]: {
    path: getRouteAddNewRecipe(),
    element: <NewRecipePage />,
  },
  [AppRoute.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
}
