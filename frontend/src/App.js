import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Banner from './components/Banner';
import PartyBrowser from './components/PartyBrowser';
import PartyDetail from './components/PartyDetail';
import EditPartyForm from './components/CreatePartyForm/EditPartyForm';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import UserDashBoard from './components/UserDashBoard';
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
            <Route exact path="/login">
                <LoginFormPage />
            </Route>
            <Route exact path="/signup">
                <SignupFormPage />
            </Route>
            <Route exact path="/parties/new">
                <CreatePartyForm />
            </Route>
            <Route exact path="/parties/:partyId/edit">
                <EditPartyForm />
            </Route>
            <Route exact path="/parties/:partyId">
                <PartyDetail />
            </Route>
            <Route exact path="/users/:userId">
                <UserDashBoard />
            </Route>
            <Route>
                <h1 style={{color: 'white'}}>404: Page not found</h1>
            </Route>
          </Switch>

      </main>
      <Footer />
    </>
  );
}

export default App;
