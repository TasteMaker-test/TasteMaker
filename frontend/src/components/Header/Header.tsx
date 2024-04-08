import s from "./Header.module.css"
import { Container } from "../UI/Container/Container.tsx"
import { Button } from "../UI/Button/Button.tsx"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.svg?react"
import { useAuth } from "../../hooks/useAuth.ts"
import userDefaultIcon from "../../assets/icons/user.png"

export const Header = () => {
  const { isAuth } = useAuth()

  return (
    <div className={s.headerWrap}>
      <Container>
        <header className={s.header}>
          <Link to="/">
            <Logo />
          </Link>
          <nav className={s.menu}>
            {/*<ul>*/}
            {/* <li>*/}
            {/*   <Link to="/">Главная</Link>*/}
            {/* </li>*/}
            {/* <li>*/}
            {/*   <Link to="/recipes">Рецепты</Link>*/}
            {/* </li>*/}
            {/* <li>*/}
            {/*   <Link to="/my-recipes">Мои рецепты</Link>*/}
            {/* </li>*/}
            {/*</ul>*/}
          </nav>

          <div className={s.btns}>
            <Button>
              <Link to="/add-new-recipe">Добавить рецепт</Link>
            </Button>
            {isAuth === "authorized" ? (
              <img src={userDefaultIcon} alt="user-icon" />
            ) : (
              <Button>
                <Link to="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>
      </Container>
    </div>
  )
}
