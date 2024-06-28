import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function(){

    const { signup } = useAuth();

    const initialData = {
        email: 'test@test.com',
        password: '12345678',
        username: 'Alessandro'
    };
    const [formData, setFormData] = useState(initialData);

    const [signupError, setSignupError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await signup(formData);
            setFormData(initialData);
        }catch(err){
            setSignupError(err);
        }
    }

    return(<>
        <div className="loginForm">
            <h1>Registrati</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="text"
                    placeholder="Email" 
                    required
                    value={formData.email}
                    onChange={e => changeData('email', e.target.value)}
                />
                <label>Password:</label>
                <input 
                    type="password"
                    required
                    placeholder="Password" 
                    value={formData.password}
                    onChange={e => changeData('password', e.target.value)}
                />
                <label>Username:</label>
                <input 
                    type="text"
                    placeholder="Nome da visualizzare" 
                    value={formData.username}
                    onChange={e => changeData('name', e.target.value)}
                />
                {signupError !== null && <div className="error">{signupError.message}</div>}
                {signupError?.errors && signupError.errors.map( (err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Registrati</button>
            </form>
        </div>
    </>)

}