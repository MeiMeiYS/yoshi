import { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptPartyUser } from "../../store/partyuser";
import { deletePartyRequest } from "../../store/session";

const PendingRequest = ({ user, sessionUser, partyId }) => {

  const dispatch = useDispatch();

  const [ display, setDisplay ] = useState(true);

    const handleAccept = e => {
        e.preventDefault();
        if (sessionUser) {
          // alert(`You have declined ${user.username}'s request.`);
          return dispatch(acceptPartyUser(user.id, partyId)).then(async (res) => {
            setDisplay('none');
          });
        }
    }

      const handleDecline = e => {
        e.preventDefault();
        //delete requests
        return dispatch(deletePartyRequest(user.id, partyId)).then(async (res) => {
          setDisplay('none');
        });
    }

  return (
    <div className="requested-user" style={{display: `${display}`}}>
      <p>
        <span>
          {user?.Image ? (
            <img crossOrigin="anonymous" src={user.Image.url}></img>
          ) : (
            <img src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"></img>
          )}
        </span>
        {user.username}
      </p>
      <div className="request-for-me-btn-group">
        <button className="accept" onClick={handleAccept}>
          Accept
        </button>
        <button className="decline" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default PendingRequest;
