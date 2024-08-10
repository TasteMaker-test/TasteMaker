import { Header } from "../shared/components/Header/Header.tsx"
import AppRoute from "./providers/router/ui/AppRoute.tsx"
import { Footer } from "../shared/components/Footer/Footer.tsx"

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
