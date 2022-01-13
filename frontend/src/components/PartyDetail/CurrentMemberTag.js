import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePartyUser } from "../../store/partyuser";

const CurrentMemberTag = ({ user, sessionUser, currentParty, partyId }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [ display, setDisplay ] = useState(true);

    const handleDeleteMember = e => {
        e.preventDefault();
        if (sessionUser) {
          // alert("Member deleted!");
          const userId = e.target.id;
          return dispatch(deletePartyUser(userId, partyId)).then(async (res) => {
            setDisplay('none');
      });
        } else history.push(`/login`);
      }


  return (
    <p style={{display: `${display}`}}>
      <span>
        {user?.Image ? (
          <img crossOrigin="anonymous" src={user?.Image?.url}></img>
        ) : (
          <img src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg"></img>
        )}
      </span>
      {user?.username}
      {user?.username === sessionUser?.username
                ? ' (you)'
                : null}
      {sessionUser?.id === currentParty?.ownerId && (
        <button
          id={user.id}
          className="delete-member-btn"
          onClick={handleDeleteMember}
        >
          X
        </button>
      )}
    </p>
  );
};

export default CurrentMemberTag;
