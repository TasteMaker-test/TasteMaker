import React, { useState } from "react"
import Select from "react-select"
import styles from "./Selectors.module.css"

// https://react-select.com/props - документация библиотеки react-select
// большая часть компонента написана с его использованием

// Интерфейс пропсов компонента
interface UnitInputProps {
  id: string
  required: boolean
}

// Интерфейс значений селектора
interface OptionsInterface {
  value: number
  label: string
}

const UnitInput: React.FC<UnitInputProps> = (props) => {
  // значения селектора
  const [options] = useState<OptionsInterface[]>([
    { value: 1, label: "г" },
    { value: 2, label: "шт" },
    { value: 3, label: "ст. л." },
    { value: 4, label: "ч. л." },
    { value: 5, label: "стакан" },
    { value: 6, label: "мл" },
    { value: 7, label: "зубчик" },
    { value: 8, label: "кг" },
    { value: 9, label: "пучок" },
    { value: 10, label: "банка" },
    { value: 11, label: "л" },
    { value: 12, label: "пакет" },
    { value: 13, label: "пачка" },
    { value: 14, label: "горсть" },
    { value: 15, label: "упаковка" },
    { value: 16, label: "щепоть" },
    { value: 17, label: "ломтик" },
    { value: 18, label: "вилок" },
    { value: 19, label: "веточка" },
    { value: 20, label: "долька" },
    { value: 21, label: "бутылка" },
    { value: 22, label: "капля" },
  ])

  return (
    <div
      className={`${styles.selector__container} ${styles.unitInput__container}`}
    >
      <label htmlFor={props.id}>
        <strong>*</strong>
        Ед. измерения
      </label>
      <Select
        isClearable={true}
        // возвращаемое значение выбранного варианта
        onChange={(e) => console.log(e)}
        // -----------------------------------------
        required={props.required ? true : false}
        id={props.id}
        placeholder="Ед. измерения"
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "Нет подходящей еденицы измерения..."}
        options={options}
      />
    </div>
  )
}

export default UnitInput
