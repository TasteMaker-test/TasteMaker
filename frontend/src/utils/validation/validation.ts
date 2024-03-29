export const validateEmail = (email: string) => {
  const regex = /^(?:[-a-zA-Z0-9_]{3,})(?:[^@\s]+@[^@\s]+\.[a-zA-Z]{2,})$/
  return String(email).toLowerCase().match(regex)
}
// старая регулярка
// /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) {
    return "Пароль должен содержать от 8 до 64 символов"
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/.test(password)) {
    return "В пароле должны быть буквы верхнего и нижнего регистра, спецсимвол и цифра."
  }

  return ""
}
