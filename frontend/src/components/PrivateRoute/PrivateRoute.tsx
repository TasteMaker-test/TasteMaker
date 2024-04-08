import { Navigate, RouteProps } from "react-router-dom"
import { ReactNode } from "react"
import { useAuth } from "../../hooks/useAuth.ts"

type Props = {
  children: ReactNode
  redirect?: string
} & RouteProps
export const PrivateRoute = ({ children, redirect = "/login" }: Props) => {
  const { isAuth } = useAuth()

  return isAuth === "authorized" ? (
    children
  ) : isAuth === "loading" ? (
    <div>Загрузка...</div>
  ) : (
    <Navigate to={redirect} />
  )
}
