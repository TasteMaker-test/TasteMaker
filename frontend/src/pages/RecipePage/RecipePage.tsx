import "./RecipePage.css"

import s from "./RecipePage.module.css"

import recipePreview from "./../../assets/recipe-example.png"
import { useAppDispatch } from "../../hooks/reduxHooks"
import {
  IRecipe,
  initialRecipeState,
} from "../../store/slices/recipes/recipeSlice"
import { addRecipe, getRecipe } from "../../store/slices/recipes/recipeActions"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function Step(props) {
  return (
    <>
      {/* <br />
      <br /> */}
      {/* <p className="recipe-subtitle">Шаг {props.n}</p> */}
      <p className="recipe-description">{props.text}</p>
    </>
  )
}

export const RecipePage = () => {
  const dispatch = useAppDispatch()

  const recipe_id = useParams()

  const [currentRecipe, setCurrentRecipe] = useState<IRecipe>()

  const recipeSelector = useSelector((state: RootState) => state.recipe)

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const data = new FormData()

      data.append("name", "Карбонара")
      data.append("description", "Вкуснейшее итальянское блюдо")
      data.append("ingredients", "Макароны, сливки, бекон, грибы, лук, сыр")
      data.append("cooking_time_in_minutes", "60")
      data.append(
        "cooking_instructions",
        "Смешайте сыр со сливками в блендере\nОбжарьте грибы, бекон и лук\nОтварите макараноны\nВсё перемешайте",
      )
      data.append("image", event.target.files[0])

      dispatch(addRecipe(data))
    }
  }

  const fetchRecipe = async () => {
    try {
      await dispatch(getRecipe(recipe_id))
      console.log(s.mainContainer)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  return (
    <div className={s.mainContainer}>
      {/* <input type="file" onChange={onImageChange} /> */}
      <p className={s.recipeTitle}>{recipeSelector.name}</p>
      <br />
      <br />
      <div className={s.recipeDescriptionDiv}>
        <p className={s.recipeDescription}>{recipeSelector.description}</p>
      </div>
      <br />
      <br />
      <img className={s.recipePreview} src={recipeSelector.image} />
      <br />
      <br />
      <div className={s.bottomDiv}>
        <div className={s.recipeDoubleDiv}>
          <div className={s.recipeIngredientsDiv}>
            <p className={s.recipeSubtitle}>ИНГРЕДИЕНТЫ</p>
            <p className={s.recipeDescription}>
              {recipeSelector.ingredients}
            </p>
          </div>
          <div className="recipe-time-div">
            {/* <p className="recipe-time-info">Время приготовления: 40 мин</p> */}
          </div>
        </div>
        <p className="recipe-subtitle">ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ</p>
        <Step n={1} text={recipeSelector.cooking_instructions} />
      </div>
    </div>
  )
}
