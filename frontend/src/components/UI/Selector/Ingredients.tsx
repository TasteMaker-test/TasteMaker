import React, { useRef } from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import styles from "./Ingredients.module.css"
import axios from "axios"
import { MultiValue } from "react-select"

// анимация селектора
const animatedComponents = makeAnimated()

// https://react-select.com/props - документация библиотеки react-select
// большая часть компонента написана с его использованием

const Ingredients: React.FC = (props) => {
  const symbolAlertRef = useRef<HTMLSpanElement>(null)

  //функция подтягивающая с сервера нужные варианты исходя из ввода пользователя
  const promiseOptions = (inputValue: string) =>
    new Promise<object[]>((resolve, reject) => {
      axios
        .get(`http://localhost/api/ingredients?ingredient_name=${inputValue}`)
        .then((response) => {
          const transfomedData = response.data.map((e: string, i: number) => ({
            value: i,
            label: e,
          }))
          resolve(transfomedData)
        })
        .catch((err) => reject(err))
    })

  // Функция валидации ввода символов (Только кирилица)
  const symbolValidation = (e: string) => {
    const regex = /^[а-яА-ЯёЁ\s]*$/

    if (!regex.test(e)) {
      symbolAlertRef.current?.classList.add(styles.symbol__alert_active)

      alert("Пожалуйста, используйте буквы кирилицы")

      setTimeout(() => {
        symbolAlertRef.current?.classList.remove(styles.symbol__alert_active)
      }, 2000)

      // убрать фокус с инпута. Но при этом последний введенный символ остаётся в поле ввода
      // document.activeElement instanceof HTMLInputElement
      //   ? document.activeElement.blur()
      //   : null
    }
  }

  return (
    <div className={styles.selector__container}>
      <label>
        <strong>*</strong>
        Ингредиенты
      </label>
      <AsyncSelect
        // Массив значений мультиселектора
        onChange={(e: MultiValue<unknown>) => console.log(e)}
        // -------------------------------
        onInputChange={symbolValidation}
        loadOptions={promiseOptions}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "В базе нет подходящего ингридиента..."}
        cacheOptions={true}
        hideSelectedOptions={true}
        closeMenuOnSelect={true}
        components={animatedComponents}
        isMulti={true}
        required={true}
        placeholder="Введите название ингредиента"
      />
      <span ref={symbolAlertRef}>
        Пожалуйста, вводите только буквы кирилицы
      </span>
    </div>
  )
}

export default Ingredients
