import { FC } from "react"
import { useAuth } from "../hooks/useAuth"


interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth()
  return (<>
    {isAuth ?  (children) : (
        <div className="flex flex-col justify-center items-center mt-20 gap-10">
            <h1 className="text-2xl">Эта страница не доступна</h1>
        </div>
        
        )}
  </>)
}

export default ProtectedRoute
