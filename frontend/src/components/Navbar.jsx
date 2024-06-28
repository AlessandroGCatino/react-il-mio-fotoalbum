import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const urlPages = [
    {
        label: 'Photos',
        href: '/photos'
    },
    {
        label: 'Contatti',
        href: '/contacts'
    }
]

export default function(){

    const { isLoggedIn, logout, user } = useAuth();

    return (
        <header>
            <NavLink to={`/`}>
                <figure>
                    <img src="/photography-logo.png" alt="" />
                </figure>
            </NavLink>
            <nav className="navbar">
                <menu>
                    <div>
                    {urlPages.map( ({label, href}, i) => (
                        <li key={`urlPage${i}`}>
                            <NavLink to={href} end>{label}</NavLink>
                        </li>
                    ))}
                    </div>
                    <div>
                    {!isLoggedIn && <>
                        <li>
                            <NavLink to={`/login`}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/register`}>Registrati</NavLink>
                        </li>
                    </>}
                    {isLoggedIn &&
                        <li>
                            <div className="t-center">
                                {user.username && <h3>{user.username}</h3>}
                                <button onClick={logout}>Logout</button>
                            </div>
                        </li>
                    }
                    </div>
                </menu>
            </nav>
        </header>
    )
}