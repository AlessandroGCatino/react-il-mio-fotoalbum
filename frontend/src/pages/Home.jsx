import { useAuth } from "../contexts/AuthContext"

export default function(){

    const { user, isLoggedIn } = useAuth();

    return (<>
        <div className="t-center">
            {isLoggedIn ? 
                <h1>Benvenuto {user.name || user.email}!</h1>
            :
                <h1>Benvenuto!</h1>  
            }
        </div>
    </>)
}