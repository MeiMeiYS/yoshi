import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import '../LoginFormPage/LoginForm-SignupForm.css';
import { signup } from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword] = useState("");

  const [ usernameIsValid, setUsernameIsValid] = useState(false);
  const [ emailIsValid, setEmailIsValid ] = useState(false);
  const [ passwordIsValid, setPasswordIsValid ] = useState(false);
  const [ confirmPasswordIsValid, setConfirmPasswordIsValid ] = useState(false);
  const [ formIsvalid, setFormIsvalid ] = useState(false);
  const [ errors, setErrors ] = useState([]);

  useEffect(() => {
    setFormIsvalid(true);
    setUsernameIsValid(true);
    setEmailIsValid(true);
    setPasswordIsValid(true);
    setConfirmPasswordIsValid(true);
    if ( !username || !email || !password || !confirmPassword ) setFormIsvalid(false);
    if ( username && (username.length < 4 || username.length > 30) ) {
        setFormIsvalid(false);
        setUsernameIsValid(false);
    }
    if( email && (email.length < 3 || email.length > 256) ) {
        setFormIsvalid(false);
        setEmailIsValid(false);
    }
    if ( password && (password.length < 8 || password.length > 20) ) {
        setFormIsvalid(false);
        setPasswordIsValid(false);
    }
    if ( confirmPassword && password !== confirmPassword ) {
        setFormIsvalid(false);
        setConfirmPasswordIsValid(false);
    }
  }, [username, email, password, confirmPassword]);

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupInfo = {
      username,
      email,
      password
    };

    console.log(signupInfo);
    return dispatch(signup(signupInfo)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="user-login-signin-block">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <i className="fas fa-user-plus"></i>
        <input
        type='text'
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="off"
        required
        ></input>
        <p className="validation-error" hidden={usernameIsValid}>Username must be between 4 and 30 characters long.</p>
        <input
        type='email'
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        required
        ></input>
        <p className="validation-error" hidden={emailIsValid}>Please provide valid email.</p>
        <input
        type='password'
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
        ></input>
        <p className="validation-error" hidden={passwordIsValid}>Your password must be between 8 and 20 characters long.</p>
        <input
        type='password'
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
        required
        ></input>
        <p className="validation-error" hidden={confirmPasswordIsValid}>Password and confirm password does not match.</p>
        <ul>
          {errors.map((error, i) => (
            <li key={i} className="validation-error">{error}</li>
          ))}
        </ul>
        <button type="submit" disabled={!formIsvalid}>Sign Up</button>
        <div className="link-container">
            <NavLink className="new-account-link" to='/login'>Have an account? Login</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignupFormPage;
