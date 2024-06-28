import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function(){

    const { login } = useAuth();

    const initialData = {
        email: 'test@test.com',
        password: '12345678'
    };
    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await login(formData);
            setFormData(initialData);
        }catch(err){
            setLoginError(err);
        }
    }

    return(<>
        <div className="loginForm">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input 
                    type="text"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={e => changeData('email', e.target.value)}
                />
                <label>Password: </label>
                <input 
                    type="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={e => changeData('password', e.target.value)}
                />
                {loginError !== null && <div className="error">{loginError.message}</div>}
                {loginError?.errors && loginError.errors.map( (err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Loggati</button>
            </form>
        </div>
    </>)

}