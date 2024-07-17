import { Header } from "./components/Header/Header.tsx"
import AppRoute from "./providers/router/ui/AppRoute.tsx"
import { Footer } from "./components/Footer/Footer.tsx"

function App() {
  return (
    <>
      <Header />
      <AppRoute />
      <Footer />
    </>
  )
}

export default App
