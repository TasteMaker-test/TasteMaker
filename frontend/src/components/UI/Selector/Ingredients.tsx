import React, { useState } from "react"
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

//интерфейс типизации объектов служащих варианнтами выбора в дропдауне
interface OptionsInteface {
  value: number
  label: string
}

const Ingredients: React.FC<SelectorProps> = (props) => {
  //дефолтные варианты выбора
  const [options, setOptions] = useState<OptionsInteface[]>([
    { value: 0, label: "персик" },
    { value: 1, label: "курага" },
    { value: 2, label: "свиные уши" },
  ])

  //функция-фильтр результата запроса с соответствием ввода пользователя
  const filterColors = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    )
  }

  //функция подтягивающая с сервера нужные варианты исодя из ввода пользователя
  const promiseOptions = (inputValue: string) =>
    new Promise<object[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 1000)
    })

  //  axios.get(`http://localhost:80/api/ingredients`)

  return (
    <div className={styles.selector__container}>
      <label htmlFor="">
        <strong>*</strong>
        {props.label}
      </label>
      <AsyncSelect
        loadOptions={promiseOptions}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "В базе нет подходящего ингридиента..."}
        cacheOptions={true}
        defaultOptions={options}
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
