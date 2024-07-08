import React, { useState } from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"
import axios from "axios"

const animatedComponents = makeAnimated()

interface SelectorProps {
  placeHolder: string
  label: string
}

interface OptionsInteface {
  value: number
  label: string
}

const Selector: React.FC<SelectorProps> = (props) => {
  const [options, setOptions] = useState<OptionsInteface[]>([
    { value: 0, label: "персик" },
    { value: 1, label: "курага" },
    { value: 2, label: "свиные уши" },
  ])

  const filterColors = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    )
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<object[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 1000)
    })

  //  axios.get(`http://localhost:80/api/ingredients`)

  return (
    <div>
      <label htmlFor="">
        <strong>*</strong>
        {props.label}
      </label>
      <AsyncSelect
        // loadOptions={}
        // onInputChange={}
        loadingMessage={() => "Загрузка..."}
        noOptionsMessage={() => "В базе нет подходящего ингридиента..."}
        cacheOptions={true}
        defaultOptions={options}
        hideSelectedOptions={true}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti={true}
        placeholder={props.placeHolder}
      />
    </div>
  )
}

export default Selector
