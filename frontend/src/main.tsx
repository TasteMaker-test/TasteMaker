import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./providers/StoreProvider/config/store.ts"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>,
)
