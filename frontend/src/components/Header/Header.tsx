import s from "./Header.module.css"
import { Container } from "../UI/Container/Container.tsx"
import { Button } from "../UI/Button/Button.tsx"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { useAuth } from "../../hooks/useAuth.ts"
import userDefaultIcon from "../../assets/icons/user.png"
import { ReactNode, useState } from "react"

import UserIcon from "./../../assets/icons/user-ico.svg?react"
import RecipesIcon from "./../../assets/icons/recipes-ico.svg?react"
import ExitIcon from "./../../assets/icons/exit-ico.svg?react"

export const Header = () => {
  const { isAuth } = useAuth()

  return (
    <div className={s.headerWrap}>
      <Container>
        <header className={s.header}>
          <Link to="/">
            <img src={Logo} alt="logo" />
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
            {!isAuth ? (
              <Button>
                <Link to="/login">Войти</Link>
              </Button>
            ) : (
              <ProfileMenuButton>
                <DropdownMenu/>
              </ProfileMenuButton>
            )}
          </div>
        </header>
      </Container>
    </div>
  )
}

interface ChildrenProps {
  children?: ReactNode
}

interface DropdownItemProps extends ChildrenProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  link: string
}

function ProfileMenuButton(props: ChildrenProps) {

  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const handleMouseOver = () => {
    setProfileMenuOpen(true)
  }

  const handleMouseOut = () => {
    setProfileMenuOpen(false)
  }

  return(
    <button className={s.profileButton} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <img src={userDefaultIcon} alt="user-icon"/>
      
      {profileMenuOpen && props.children}

    </button>
  )
}

function DropdownMenu() {

  function DropdownItem(props: DropdownItemProps) {
    return(
      <Link to={props.link} className={s.menuItem}>

        <span>{props.leftIcon}</span>

        {props.children}

        <div className={s.menuItemDiv}>
          <span>{props.rightIcon}</span>
        </div>
      </Link>
    )
  }

  return(
    <div className={s.dropdown}>
      <DropdownItem link="/my-profile" rightIcon={<UserIcon/>}>Мой профиль</DropdownItem>
      <DropdownItem link="#" rightIcon={<RecipesIcon/>}>Мои рецепты</DropdownItem>
      <DropdownItem link="#" rightIcon={<ExitIcon/>}><span className={s.exitButton}>Выйти</span></DropdownItem>
    </div>
  )
}


