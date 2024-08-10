import mockMainBanner from "../../shared/assets/main-banner.jpg"
import { RecipeList } from "../../shared/components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"
import { useEffect, useState } from "react"
import { $apiWithoutToken } from "../../shared/api"
import { IRecipe } from "../../shared/lib/store/slices/recipes/recipeSlice.ts"
import { useAppSelector } from "../../shared/lib/hooks/reduxHooks.ts"

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
      <img
        src={mockMainBanner}
        alt="Изображение блюда"
        className={s.mainBanner}
      />
      <RecipeList recipes={recipes} />
    </div>
  )
}
