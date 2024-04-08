import { useAppSelector } from "./reduxHooks"

export const useAuth = () => {
  const { email, accessToken, status } = useAppSelector((state) => state.user)

  return {
    isAuth: status,
    accessToken,
    email,
  }
}
