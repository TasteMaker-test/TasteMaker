import mockMainBanner from "../../assets/main-banner.jpg"
import { RecipeList } from "../../components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"
import { useEffect, useState } from "react"
import { $apiWithoutToken } from "../../http"
import { IRecipe } from "../../store/slices/recipes/recipeSlice.ts"
import { useAppSelector } from "../../hooks/reduxHooks.ts"
import Ingredients from "../../components/UI/Selectors/Ingredients.tsx"
import TextInput from "../../components/UI/Inputs/TextInput.tsx"

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
      <form
        style={{ width: "100%", display: "flex", position: "relative", justifyContent: "space-around" }}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Ingredients id="testIngrSelect" required={true} />
        <TextInput id="testTextInput" required={true} />

        <button
          style={{ height: "25px", position: "absolute", bottom: "-10px" }}
          type="submit"
        >
          sub
        </button>
      </form>
      <img
        src={mockMainBanner}
        alt="Изображение блюда"
        className={s.mainBanner}
      />
      <RecipeList recipes={recipes} />
    </div>
  )
}
