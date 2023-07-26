import { FC } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from "../hooks/useAuth"
import { useAppDispatch } from "../store/hooks"
import { logout } from "../store/user/userSlice"
import { removeTokenLocalStorage } from "../helper/localstorage.hepler"
import { toast } from "react-toastify"

const Header: FC = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenLocalStorage('token')
        toast.success('Вы успешно вышли')
        navigate('/auth')
    }

    return (
        <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
            {
                isAuth ? (
                    <Link to = {'/'}>
                        <FaBtc size={30} />
                    </Link>
                ) : (
                    <Link to = {'auth'}>
                        <FaBtc size={30} />
                    </Link>
                )
            }

            {
                isAuth && (
                    <nav className="ml-auto mr-10">
                        <ul className="flex items-center gap-5">
                            <li>
                                <NavLink to = {'/'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>Главная</NavLink>
                            </li>
                            <li>
                                <NavLink to = {'transaction'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>Транзакции</NavLink>
                            </li>
                            <li>
                                <NavLink to = {'categories'} className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>Категории</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
            {
                isAuth ? (
                    <button className="btn btn-red" onClick={logoutHandler}>
                        <span>Выйти</span>
                        <FaSignOutAlt/>
                    </button>
                ) : (
                    <Link className="py-2 text-white/50 hover:text-white ml-auto" to = {'auth'}>
                        Войти
                    </Link>
                )
            }
        </header>
    )
}

export default Header
