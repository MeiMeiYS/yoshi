import { Switch, NavLink, Route } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";


function App() {


  return (
    <main>
      <nav className='top-nav-bar'>
        <h1>App.js</h1>
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
