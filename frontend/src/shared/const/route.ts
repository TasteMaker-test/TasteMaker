export enum AppRoute {
  MAIN = "main",
  LOGIN = "login",
  REGISTRATION = "registration",
  RECIPES = "recipes",
  ADD_NEW_RECIPES = "add-new-recipe",
  //last
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/"
export const getRouteLogin = () => "/login"
export const getRouteRegistration = () => "/registration"
export const getRouteRecipes = (id: string) => `/recipes/${id}`
export const getRouteAddNewRecipe = () => `/add-new-recipe`

export const AppRouteByPathPattern: Record<string, AppRoute> = {
  [getRouteMain()]: AppRoute.MAIN,
  [getRouteLogin()]: AppRoute.LOGIN,
  [getRouteRegistration()]: AppRoute.REGISTRATION,
  [getRouteRecipes(":id")]: AppRoute.RECIPES,
  [getRouteAddNewRecipe()]: AppRoute.ADD_NEW_RECIPES,
}
