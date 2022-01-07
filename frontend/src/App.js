import { Switch, NavLink, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginFormPage from "./components/LoginFormPage";


function App() {

  const sessionUser = useSelector(state => state.session.user);
  console.log('This is sessionUser:',sessionUser)



  return (
    <main>

        <h1>App.js</h1>
        <NavLink exact to={`/`}>Home</NavLink>
        <NavLink to={`/login`}>Login</NavLink>

      <Switch>
      <Route exact path="/">
        <h1>Home Page</h1>
      </Route>
        <Route path="/login">
          {
            <LoginFormPage />

          }
        </Route>
        <Route>
            <h1>404: Page not found</h1>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
