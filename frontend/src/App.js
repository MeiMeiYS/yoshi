
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import Footer from './components/Footer';


function App() {

  return (
    <main>
      <Navigation />

      <section>
        <Switch>
        <Route exact path="/">
          <h1>Home Page</h1>
        </Route>
          <Route path="/login">
              <LoginFormPage />
          </Route>
          <Route path="/signup">
              <SignupFormPage />
          </Route>
          <Route>
              <h1>404: Page not found</h1>
          </Route>
        </Switch>
      </section>

      <Footer />
    </main>
  );
}

export default App;
