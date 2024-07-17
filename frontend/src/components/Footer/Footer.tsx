import style from "./Footer.module.css"
import copy from "../../assets/icons/copyright.png"
export const Footer = () => {
  return (
    <footer className={style.footer}>
      <img src={copy} alt="Copyright" />
      <span>Copyrighting Tastemaker 2024</span>
    </footer>
  )
}
