import React, { useRef, useState } from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import styles from "./Ingredients.module.css"
import axios from "axios"

// анимация селектора
const animatedComponents = makeAnimated()

// https://react-select.com/props - документация библиотеки react-select
// большая часть компонента написана с его использованием

// Интерфейс пропсов компонента
interface IngredientsProps {
  required?: boolean
  id: string
}

// интерфейс для запроса на сервер
interface IngredientInterface {
  id: number
  name: string
}

const Ingredients: React.FC<IngredientsProps> = (props) => {
  const symbolAlertRef = useRef<HTMLSpanElement>(null)
  const [searchInputValue, setSearchInputValue] = useState<string>("")

  //функция подтягивающая с сервера нужные варианты исходя из ввода пользователя
  const promiseOptions = (inputValue: string) =>
    new Promise<object[]>((resolve, reject) => {
      axios
        .get(`http://localhost/api/ingredients?ingredient_name=${inputValue}`) //API откуда берутся ингредиенты
        .then((response) => {
          const transfomedData = response.data.map(
            (e: IngredientInterface) => ({
              value: e.id,
              label: e.name,
            }),
          )
          resolve(transfomedData)
        })
        .catch((err) => reject(err))
    })

  // Функция валидации ввода символов (Только кирилица)
  const symbolValidation = (e: string) => {
    const regex = /^[а-яА-ЯёЁ\s]*$/
    setSearchInputValue(e)
    if (!regex.test(e)) {
      symbolAlertRef.current?.classList.add(styles.symbol__alert_active)

      // убрать фокус с инпута
      document.activeElement instanceof HTMLInputElement
        ? document.activeElement.blur()
        : null

      setTimeout(() => {
        symbolAlertRef.current?.classList.remove(styles.symbol__alert_active)
      }, 2000)
    }
  }

  return (
    <div className={styles.selector__container}>
      <label htmlFor={props.id}>
        <strong>*</strong>
        Ингредиенты
      </label>
      <AsyncSelect
        inputValue={searchInputValue}
        id={props.id}
        //Значение селектора
        onChange={(e) => console.log(e)}
        // -------------------------------
        onInputChange={symbolValidation}
        loadOptions={promiseOptions}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "В базе нет подходящего ингридиента..."}
        cacheOptions={true}
        isClearable={true}
        backspaceRemovesValue={true}
        hideSelectedOptions={true}
        closeMenuOnSelect={true}
        components={animatedComponents}
        required={props.required ? true : false}
        placeholder="Введите название ингредиента"
      />
      <span ref={symbolAlertRef}>
        Пожалуйста, вводите только буквы кирилицы
      </span>
    </div>
  )
}

export default Ingredients
