import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import './LoginForm-SignupForm.css';
import { login } from "../../store/session";

const LoginFormPage = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const [ formIsvalid, setFormIsvalid ] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    setFormIsvalid(true);


    if ( !credential || !password ) setFormIsvalid(false);
    if (credential.length < 3 || credential.length > 256) setFormIsvalid(false);
  }, [credential, password]);

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    return <Redirect exact to="/" />;
  }

  const handleDemoLogin = e => {
    e.preventDefault();
    const loginCredentials = {
      credential: 'demo@user.io',
      password: 'password',
    };
    return dispatch(login(loginCredentials)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const loginCredentials = {
      credential,
      password,
    };
    return dispatch(login(loginCredentials)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="user-login-signin-block">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <i className="fas fa-user"></i>
        <input
        type='text'
        placeholder="Username or Email"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        required
        ></input>
        <input
        type='password'
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        ></input>
        <ul className="errors-404">
          {errors.map((error, i) => (
            <li key={error} className="validation-error">{error}</li>
          ))}
        </ul>
        <button type="submit" disabled={!formIsvalid}>Login</button>
        <button type="button" className="demo-btn" onClick={handleDemoLogin}>Demo Site</button>
        <div className="link-container">
            <NavLink className="new-account-link" exact to='/signup'>Create a New Account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginFormPage;
