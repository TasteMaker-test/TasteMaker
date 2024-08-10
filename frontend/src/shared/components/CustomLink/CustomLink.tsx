import { Link, useMatch } from "react-router-dom"

interface CustomLinkProps {
  to: string
  children: React.ReactNode
}

export const CustomLink = ({ to, children }: CustomLinkProps) => {
  const match = useMatch(to)

  return (
    <Link
      to={to}
      style={{
        color: match ? "blue" : "#000000",
      }}
    >
      {children}
    </Link>
  )
}
