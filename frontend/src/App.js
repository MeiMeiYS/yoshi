import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSession } from './store/session';
import * as sessionActions from './store/session';


function App() {

  //vvv this user login works!
  const dispatch = useDispatch();
  const sessionUser = dispatch(createSession({credential:'demo@user.io', password: 'password'}));
  console.log(sessionUser);


  return (
    <h1>Hello from App</h1>
  );
}

export default App;
