import { useState, useEffect } from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { restoreSession } from './store/session';
import LoginFormPage from "./components/LoginFormPage";


function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  console.log('This is sessionUser:',sessionUser)

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);


  return (
    <main>
      <nav className='top-nav-bar'>
        {sessionUser ? <h1>Hi! {sessionUser.username}</h1> : <h1>Hi! Stranger</h1>}
        <NavLink exact to={`/`}>Home</NavLink>
        <NavLink to={`/login`}>Login</NavLink>
      </nav>

      <Switch>
      <Route exact path="/">
        <h1>Home Page</h1>
      </Route>
        <Route path="/login">
            <LoginFormPage />
        </Route>
        <Route>
            <h1>404: Page not found</h1>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
