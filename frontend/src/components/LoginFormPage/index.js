import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createSession } from "../../store/session";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formInvalid, setFormInvalid ] = useState(true);

    useEffect(() => {
        if (credential.length < 3 || credential.length > 256) setFormInvalid(true);
        else if (!password) setFormInvalid(true);
        else setFormInvalid(false);
    }, [credential, password])


    const handleSubmit = e => {
        e.preventDefault();

        const loginCredentials = {
            credential,
            password
        }

        const user = dispatch(createSession(loginCredentials));
        if (user){
            history.push('/');
        }

    }

    return (
        <div>
            <h1>LoginFormPage</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Username or Email"
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                    ></input>
                </div>
                <div>
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <button
                    type="submit"
                    disabled={formInvalid}
                >Login</button>
            </form>
        </div>

    )
}

export default LoginFormPage;
