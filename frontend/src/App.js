import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Banner from './components/Banner';
import PartyBrowser from './components/PartyBrowser';
import PartyDetail from './components/PartyDetail';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import Footer from './components/Footer';

import CreatePartyForm from './components/CreatePartyForm';

function App() {


  return (
    <>
      <Navigation />
      <main>

          <Switch>
          <Route exact path="/">
            <Banner/>
            <PartyBrowser />
          </Route>
            <Route path="/login">
                <LoginFormPage />
            </Route>
            <Route path="/signup">
                <SignupFormPage />
            </Route>
            <Route path="/parties/new">
                <CreatePartyForm />
            </Route>
            <Route path="/parties/:partyId">
                <PartyDetail />
            </Route>
            <Route>
                <h1>404: Page not found</h1>
            </Route>
          </Switch>

      </main>
      <Footer />
    </>
  );
}

export default App;
