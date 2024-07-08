import mockMainBanner from "../../assets/main-banner.jpg"
import { RecipeList } from "../../components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"
import { useEffect, useState } from "react"
import { $apiWithoutToken } from "../../http"
import { IRecipe } from "../../store/slices/recipes/recipeSlice.ts"
import { useAppSelector } from "../../hooks/reduxHooks.ts"
import Selector from "../../components/UI/Selector/Selector.tsx"

export const HomePage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const recipe = useAppSelector((state) => state.recipe)

  useEffect(() => {
    $apiWithoutToken.get("/recipes/").then((res) => {
      setRecipes(res.data)
    })
  }, [recipe])

  return (
    <div>
      <Selector
        label="Ингридиенты"
        placeHolder="Введите название ингридиента"
      />
      <img
        src={mockMainBanner}
        alt="Изображение блюда"
        className={s.mainBanner}
      />
      <RecipeList recipes={recipes} />
    </div>
  )
}
