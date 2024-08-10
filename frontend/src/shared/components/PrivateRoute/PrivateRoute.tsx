import { Navigate, RouteProps } from "react-router-dom"
import { ReactNode } from "react"
import { useAuth } from "../../lib/hooks/useAuth.ts"
import { IUser } from "../../lib/store/slices/authorization/userSlice.ts"

type Props = {
  children: ReactNode
  redirect?: string
  authStatus?: IUser["status"]
} & RouteProps
export const PrivateRoute = ({
  children,
  redirect = "/login",
  authStatus = "authorized",
}: Props) => {
  const { isAuth } = useAuth()

  return isAuth === authStatus ? (
    children
  ) : isAuth === "loading" ? (
    <div>Загрузка...</div>
  ) : (
    <Navigate to={redirect} />
  )
}
