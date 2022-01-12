import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { restoreSession } from "../../store/session";
import { fetchOneParty, checkPartyNameAvailability, updateParty, deleteParty } from "../../store/party";

import "./PartyForm.css";

const EditPartyForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { partyId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const currentParty = useSelector((state) => state.parties[partyId]);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [partyName, setPartyName] = useState(currentParty?.name ?? '');
  const [space, setSpace] = useState(currentParty?.space ?? '');
  const [url, setUrl] = useState(currentParty?.Image?.url ?? '');
  const [description, setDescription] = useState(currentParty?.description ?? '');
  const [hasHydrated, setHasHydrated] = useState(false);

  const [partyNameIsValid, setPartyNameIsValid] = useState(false);
  const [partyNameNotStartWithNum, setPartyNameNotStartWithNum] = useState(false);
  const [partyNameIsOkToUse, setPartyNameIsOkToUse] = useState(true);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [urlIsValid, setUrlIsValid ] = useState(false);
  const [formIsvalid, setFormIsvalid] = useState(false);

  //fetch all data
  useEffect(() => {
    dispatch(restoreSession());
    dispatch(fetchOneParty(partyId));
    return () => {}
  }, [dispatch]);

  useEffect(() => {
    if (currentParty && !hasHydrated){
      setPartyName(currentParty.name);
      setSpace(currentParty.space);
      setDescription(currentParty.description);
      if (currentParty.imageId) setUrl(currentParty.Image.url);
      setHasHydrated(true);
    }
  }, [currentParty, hasHydrated]);

  useEffect(() => {
    setFormIsvalid(true);
    setPartyNameIsValid(true);
    setDescriptionIsValid(true);
    setPartyNameNotStartWithNum(true);
    setPartyNameIsOkToUse(true);
    setUrlIsValid(true);

    const startWithNum = new RegExp("^[^0-9]");
    if (!partyName || space === 0 || !description) setFormIsvalid(false);
    if (partyName && (partyName.length < 3 || partyName.length > 60)) {
      setFormIsvalid(false);
      setPartyNameIsValid(false);
    }
    if (partyName && !startWithNum.test(partyName)) {
      setFormIsvalid(false);
      setPartyNameNotStartWithNum(false);
    }
    if (description && (description.length < 10 || partyName.length > 5000)) {
      setFormIsvalid(false);
      setDescriptionIsValid(false);
    }
    if ( url && (url.length < 6 || url.length > 600) ) {
      setFormIsvalid(false);
      setUrlIsValid(false);
    }
  }, [partyName, space, description, url]);

  useEffect(() => {
    if (currentParty && Object.keys(currentParty).length) setIsLoading(false);
  }, [currentParty]);

  if (currentParty && !isLoading && !sessionUser) {
    return <Redirect to="/" />;
  }

  const handleCancle = (e) => {
    e.preventDefault();
    history.push(`/parties/${partyId}`);
  };

  const handleDelete = e => {
    e.preventDefault();
    // dispatch(deleteParty(partyId)).then(res => {
    //   if (res ==='success'){
    //     history.push('/');
    //   } else {
    //     alert('Oppppp! Somthing went wrong!');
    //     history.push('/');
    //   }
    // });
    return dispatch(deleteParty(partyId)).then(async () => {
      history.push('/');
    }).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        alert('Oppppp! Somthing went wrong!');
      };
      history.push('/');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //check if this name is ok to use
    return dispatch(checkPartyNameAvailability(partyId, partyName)).then(async(res) => {
      if (res !== 'ok') {
        setPartyNameIsOkToUse(false);
        setFormIsvalid(false);
        return;
      } else {

        const editedPartyObj = {
          name: partyName,
          description,
          space: parseInt(space, 10),
          url,
        };

        dispatch(updateParty(partyId, editedPartyObj)).then(async(currentParty) => {
          if (currentParty) {
            history.push(`/parties/${partyId}`);
          }
        }).catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        })
      }
    });

  };

  return (
    <div className="edit-party-block">
      {currentParty && (
        <form className="edit-party-form" onSubmit={handleSubmit}>
          <h1>Edit My Party</h1>
          <i className="fas fa-gamepad"></i>
          <input
            type="text"
            placeholder="Give your party a name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            required
          ></input>
          <p className="validation-error" hidden={partyNameIsValid}>
            Party name must be between 3 and 60 characters long.
          </p>
          <p className="validation-error" hidden={partyNameNotStartWithNum}>
            Party name cannot start with number.
          </p>
          <p className="validation-error" hidden={partyNameIsOkToUse}>
            This party name has already been taken.
          </p>
          <div className="video-game-inform-disabled">
            <p>
              {currentParty?.Videogame?.name}
              <span>* This cannot change</span>
            </p>
          </div>
          <select value={space} onChange={(e) => setSpace(e.target.value)}>
            <option value={0} disabled>
              --Choose Party Space--
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
          <input
            type="url"
            placeholder="Enter an image URL for your party here (optional)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <p className="validation-error" hidden={urlIsValid}>Url is too long or too short.</p>
          <textarea
            type="text"
            placeholder="Party description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <p className="validation-error" hidden={descriptionIsValid}>
            Description must be more than 10 characters long.
          </p>
          <ul className="login-errors">
          {errors.map((error, i) => (
            <li key={i} className="validation-error">{error}</li>
          ))}
          </ul>
          <div className="edit-party-btn-group">
          <button
              className="party-detail-delete-btn"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="cancel-edit-party"
              type="button"
              onClick={handleCancle}
            >
              Cancel
            </button>
            <button
              className="submit-edit-party"
              type="submit"
              disabled={!formIsvalid}
            >
              Submit
            </button>
          </div>
          <div className="link-container"></div>
        </form>
      )}
    </div>
  );
};

export default EditPartyForm;
