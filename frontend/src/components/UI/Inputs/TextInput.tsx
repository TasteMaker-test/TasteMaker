import React, { FormEvent, useRef } from "react"
import styles from "./TextInput.module.css"

// Интерфейс пропсов компонента
interface TextInputProps {
  required?: boolean
  id: string
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const symbolAlertRef = useRef<HTMLSpanElement>(null)

  // Функция валидатор значения инпута
  const valueValidation = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    if (inputValue.length > 5 || !/^\d+$/.test(inputValue)) {
      e.currentTarget.value = e.currentTarget.value.slice(0, -1)

      symbolAlertRef.current?.classList.add(styles.symbol__alert_active)
      setTimeout(() => {
        symbolAlertRef.current?.classList.remove(styles.symbol__alert_active)
      }, 2000)
    }
  }

  return (
    <div className={styles.textInput__container}>
      <label htmlFor={props.id}>
        <strong>*</strong>
        Количество
      </label>
      <input
        id={props.id}
        onInput={valueValidation}
        className={styles.textInput}
        required={props.required ? true : false}
        type="number"
        placeholder="Введите количество"
        min={+1}
      />
      <span ref={symbolAlertRef}>Можно ввести численных знаков: от 1 до 5</span>
    </div>
  )
}

export default TextInput
