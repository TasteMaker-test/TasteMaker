import React from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import styles from "./Ingredients.module.css"
import axios from "axios"

const animatedComponents = makeAnimated()

// https://react-select.com/props - документация библиотеки react-select
// большая часть компонента написана с его использованием

//интерфейс типизации пропсов, которые  необходимо пробросить в компонент при его обявлении
interface SelectorProps {
  placeHolder: string
  label: string
}

const Ingredients: React.FC<SelectorProps> = (props) => {
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

  return (
    <div className={styles.selector__container}>
      <label>
        <strong>*</strong>
        {props.label}
      </label>
      <AsyncSelect
        loadOptions={promiseOptions}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "В базе нет подходящего ингридиента..."}
        cacheOptions={true}
        hideSelectedOptions={true}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti={true}
        required={true}
        placeholder={props.placeHolder}
      />
    </div>
  )
}

export default Ingredients
