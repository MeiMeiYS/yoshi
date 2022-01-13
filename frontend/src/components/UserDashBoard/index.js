import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserDashBoard.css";
import { fetchPartyRequests, fetchMyParties } from "../../store/session";
import PartyBlock from "./PartyBlock";


const UserDashBoard = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const myRequests = useSelector((state) => state.session.myRequests);
  const myParties = useSelector((state) => state.session.myParties);

  console.log(myParties)

    useEffect(() => {
        if (sessionUser) {
          dispatch(fetchMyParties(sessionUser.id));
          dispatch(fetchPartyRequests(sessionUser.id));
        }
        window.scrollTo(0, 0);
    }, [sessionUser]);

    const pendingRequests = [];
    // turn data back to array
    for (const party in myRequests) {
        pendingRequests.push(myRequests[party]);
    }

    const partiesIHosted = [];
    // turn data back to array
    for (const party in myParties) {
      partiesIHosted.push(myParties[party]);
    }

  return (
    <div className="user-dash-board-page">
      <h1>My Parties</h1>
      <div className="user-page-section-block">
        <div className="user-dash-title">
          <h2>Hosting parties:</h2>
        </div>

        {partiesIHosted.length ?
          partiesIHosted.map((party) => {
            return (
              <PartyBlock
                party={party}
                sessionUser={sessionUser}
                key={party.id}
              />
            );
          }) : <p>No party here...</p>

          }

      </div>
      <hr/>
      <div className="user-page-section-block">
        <div className="user-dash-title">
          <h2>Joined parties:</h2>
        </div>



      </div>
      <hr/>
      <div className="user-page-section-block">
        <div className="user-dash-title">
          <h2>Pending requests:</h2>
        </div>

        {pendingRequests.length ?
          pendingRequests.map((party) => {
            return (
              <PartyBlock
                party={party}
                sessionUser={sessionUser}
                key={party.id}
                myRequest={true}
              />
            );
          }) : <p>No party here...</p>

          }

      </div>
    </div>
  );
};

export default UserDashBoard;
