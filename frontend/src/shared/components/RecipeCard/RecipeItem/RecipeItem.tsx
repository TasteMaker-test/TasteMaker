import s from "./RecipeItem.module.css"
import { IRecipe } from "../../../lib/store/slices/recipes/recipeSlice.ts"
import { Link } from "react-router-dom"
export const RecipeItem = ({ name, image, id }: IRecipe) => {
  return (
    <div className={s.item}>
      <Link to={`/recipes/${id}`} className={s.link}>
        <img src={image || ""} alt={name || ""} className={s.img} />
        <span className={s.title}>{name}</span>
      </Link>
    </div>
  )
}
