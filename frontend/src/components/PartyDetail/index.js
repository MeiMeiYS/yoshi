import { useEffect, useState } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PartyDetail.css";
import favicon from "../../images/favicon.png";
import anonymousPerson from "../../images/anonymous-person.jpeg"
import { fetchOneParty } from "../../store/party";
import { fetchAllPartyUsers } from "../../store/partyuser";
import {
  sendPartyRequest,
  deletePartyRequest,
  fetchPartyRequests,
  fetchRequestsForMyParty,
} from "../../store/session";
import PendingRequest from "./PendingRequest";
import CurrentMemberTag from "./CurrentMemberTag";

const platformIcons = {
  1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACHh4f5+fl0dHTy8vKRkZFpaWlJSUkfHx+ZmZmgoKDt7e1mZmYbGxvp6ek8PDzJycnj4+MnJycWFhZQUFDb29uBgYFdXV3AwMBYWFi4uLitra1TU1MICAg1NTXFxcWenp7U1NQ3Nzd6enpAQEAgyE4lAAAEcUlEQVR4nO3d6XaqMBQFYJGCA1o04IAiWi3v/4rXgNYFipyEBG5wf7+6ViVkiyQhTIMBAAAAAAAAAAAAAAAAAAAAAAAAAAC0ynY60Vo+5s3HXdhOz2IVdWYC7Mdyp8DqSugJ5IsvYoUH+3vARE/taegRPfHC42xBe6W+2gJC6s54nogXnjC+5Fp9rYVQN2IsU/heekmFvvT9SC1rypec8r+Sw6h925Cvei6a8Hu8qjEOnxNOBJttJZxUJqHn13cUzEvKCb+XGpNU8RfiCamb4pyYmpDcufyYmpA80FsfzUy4sOs/mJsdzEw4Jid0dkjYAiQs+pSE5MLtrZkJJ78bot/AzISizEsYuFMi19Aev//74Qe0pUj4BwlbgYRFH5IwZdQ5/bWhx4dh3TTbY77t28yEVkiWmJnwcloSRWMzE/a/pUHCByRsBRIWIWGJqQkX5zXR0tD+UJR5CZOAzNBRG2aiHkxtafqfMO39GdL+n+W+XalG/riBCYM17dMsNDWhlcT+rPbKXBabe8XQ1XG3rbH7u2DWzIQikFAzJCxCQiREQh2QsAgJkRAJdUDCIiREQiTUAQmLkBAJkVAHJCxCQiREQh2QsKhhwkkXCWdS9+NLJrS+Jx2w2knY/+di+KqrLCjSnnAwUl1nIUfq9SMNEq4XqmstIKRuwiYJB2ynut5kKb0Nb5Jw4CyHoznJaFxb6IRY1NUm8skBmyUUENUWehAvlKSthHu+XBBHL/3wf67Uh8u0mTDZV/037knCI6v6L+tJQqtyG3p9SZhMX++HrtWXhG8hoSwkREJ16wnVhyOuWUlC56jle6PQknA92pWQij0Wl9mqeSajloSKjo1H5Jsk2k6o7NmtSiby5J/QWk3Z9MZORcK1xPOcJ5Uj6IzMg3srEG+SeE98IyY1958MlQUkzxi+J/zM6sv7BsBXtwnJd7q8x2+D2VMf986HJouaAqOhMuQJtdqE5JL4dMtFyWpbJJfQjlzXVbexxFxXHQn0lXIJs+Zk5HZiztc9FEv44zMS37sl5BMrilo6Cb987fcuyy69geJ54x5EGzg+sck3YfK+W9TIeXy/bPjUoa/i0nyxcIcY326WVTNslMLvKM86rfxkaVlaHHTZgj305rrM6Za0K9F9/dOKSg4L377tCZxEOsb8nmG+I0wEzh2oxtLbV125i5UODgTeFpN9NzYvg3qWWYuNlQ+Pq98+0uzgMpt06eIahT/L28+0+te3bVQ+PzwK2nthzyt8NJ3mTc5rjd7acA6ef+hty6bJ2buOoElDyItNTqrqKuecNyesOqErX3j2Cp1Dd51hxuFDt52Tb8uXBIZ1ZazhN6RGNsG0HMwq25oGNcxGCDN1dZXDgnw7sappmAb7YTa5q66qTavBvl4GTOUHJPmrutyO90M73wF5p2xHL/qMQ4PDgk3lvt2B+8DKLz6SrNE+5HR3mdAL9KcjCej6msQCPeOOaPj1nxjWTL7Ls/8TuvIBAAAAAAAAAAAAAAAAAAAAAAAAAHyof8t2pNK11x6vAAAAAElFTkSuQmCC",
  2: "data:image/png;base64,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",
  3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAclBMVEUAAAD////z8/MWFhZnZ2d7e3twcHAiIiL4+PiysrLj4+PPz88YGBjKyspUVFS6urqjo6OOjo4uLi7CwsLc3NxNTU1AQEDv7++dnZ02NjY7OzuGhoZ+fn7m5uatra2WlpZISEgLCwsnJydbW1tqamqLi4tUtWEmAAAEjUlEQVR4nO3aa6OpSgAGYCXpRlIpKyrb9v//4gnTfW6po7V5n0/L0lx61cyYLBYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8G8JvXA5dx/mdlIU1c7Cubsxq5XyoPqn/dxdmQ3J4C6Iv/RyaGRQsHbfGEM7g3sM3mXuPr1bLwNFMXbruXv1XpQMihHyNne33qqVgVH9tZm7X+/UzGC32EbVsPBFK6dGBkbxMqxnSonCF8dxlgLFARKD7OVxaFPx8lK3Uv5PbFwG5/vrc+OqEEoNVUYUxH941ezjIKIUM7JBrRDjMrDur+36tXh2cGkDKp3HriVmldkNbqUwQQab+nUqLOwP6Js/vJJfkEEkLBzqYpnVPqOutGw96xXNWxncJBorTJuB8vNCfRQZqe5Ae7MchDN2eZLBcZreUPAySCZqY/esjno3kPZiTnGXE+EkeBlIzAxynmsvg/bWsyXuaD5rBsxhbChSKWWi+ZFoadYMJlswm8zxZStxxc2agT1VIz7zOvieDNjjwa/PYKp7IWbf9L8+A/FCUYpHqssp78lkYEocM8oE64NLrrH99QJeojIZ6GUFnGYKoTP03Eu8DKRWZus0UmTQpz+ZDBZyDSiqnw88eYKTgcwOwkI3+p2hYSwEpTL4kWzj1buXk8HfQcUNNtXasS4pqQwWazPiVH9X9uKlYZydgUx1B3LseXVcs3FuVLkMCpzqC3u93Pd4ZeRkZiCVqD0i/QfpDITK2WfgFLpMtF4Gi8RWiws7WMlUQC4D8UYD03QZlBsRg77kaL5afGvvZVDMdccDd/uvljwLcr77i0yYAVmNym8ohs8ZzaNlII+sXvLBBStTZuAPuRkOcTnjUjPIV7FrB+fobNn+LtlydqvJKnbEU/spMyA3w1V85L5auNEyCLP7cNBisJ/Jj8/gOmEG5KoUPTm/rOzW+XUzOCt0VkzdaB+fQVL2YwJk85Y/lml+d8G16mTAiID1UY3PgFyT29drqJBLiru6PVmdswoSp7s+aLx7TrXj2tnrVSlK5aMzuJG2Xq6g5pAx7sQ+ZNtJwMqeO1v0DCKz+mRO1fv9KXBsBuUTJqnFCJ8WVSfBoitNalqdIiUDw9Wqcsusvn36q49BGaRmh68yK25ZdQv2udUnzHkm0hjsDbeePS79DDb1k5plewTVerUOyeDC/PInWtkNeNam5uxq1vVhbvUk/E8S3DoZ2Ek9/mtue5akjN1TZCD+zYt8Bi73MXH9YLO8CPSNwVknht2dEYs2dGf2XSD38yXf7tuYuvjHCR6lIIV7E+351Fe1H3tZahvks6VlcNh11wn2K48yf5+Etv6hZHBsriOf/88+5yes17QXQ/d7o3OyO0dE6af9avO4MoP6Ro+C7v5BZ9xqzpKfZXnMr9dreHxscXHWypsJli7/BFYGgfc5g4CITsvgvMvn7tdbOaeN0cogMj9tFJSx1N2IZGD4nzoKil00Uy2+wZ6+7BfrPf/fw20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICH/wBnUD5yppLy0QAAAABJRU5ErkJggg==",
  4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAABmZmYsLCyPj49qamrb29ulpaW1tbUzMzOGhobd3d3y8vJDQ0PW1tb8/PxXV1fAwMA7Ozvm5uZSUlLPz8+qqqp/f381NTVOTk52dnZeXl4mJiYICAiTk5NwcHAZGRmbm5vt7e3FxcUgICAWFha5ublqeDSEAAAEI0lEQVR4nO3ccVeqMBzGcZZe01BJDVDLSr31/l/iLWDLim0/PDii+/38U+cEjAcGYxsRRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+pjSfTQYXtlmcFLjYXLq4wSxPTXGjpQoiMyVmYQpcjqrjGaY4pZ6TKmDyHKrIot7MQ5WmlEkYrsj5W3GBquibgUk4CFbmMmAdVeporsNjuEIX0bb67f7qwvL5yb10nv+5sKsq1zaqKsyqlVbnJ1mVwQbRrviZd70/F5AXyXZRmXTY9e5cwLCMRsIeI2H/kbD/SNh/JOw/EvYfCfuPhP0nSzjNrqXGx8SykS/mY8tGx8INvDlkWdxOwlvVxObVu2vx1rG+tCYlj+9LX7eRsPHA5swzonXjXHsrC5j9LRf3lCVL+NAwoVIHV6GeKvEkyTdf68Uz94KyWuo+5nX+Oi6m3LPu2J9v+vSx+E0bCaN4JJLuTbl7a5Hxx8k6juLvBGO2nyat2kkotvKfRHMKPdXLarRRHSb8OLxzywKJngOanVnC10oeOuHUV03NWRZcbjXMFFK+7Chhou9xtm2ZhKllAZfVva4AaTTrKGF05ynYTMVOm297r9d9a+aTrhKapwPbts5PmOpm+f591c4SHk4Oc61zE5omcFC+zSFNWDzaqZf2Ej7qALZH4jMTZjtdN6pmSJowLRZ6ai2hudWtbe3hWQljHWdmDpw0YVFNH6aihEm8GLvt9a3O0RackXB6U7NVccJoNH6v1/6Eh3yn5G6t22me8LXqRKj8dBV5wpI34WuDeCdvlHzXNKFpAtefG9C2E44bBXT18BomNHeur89ILSeMldwyd/YOGiU0TeDVtw5nywnNHeR5mLo7UN7OT4OEB90EPiy+/7HdhOYUTpx9dxF5QtNNGdZd1e0m3OuybF2iBqQJzcuglkGfdhP+0YXJNuYkS5joXuCLrZ/cbkLdqRaOgjmJEpomcGtdSp7w+j6PPQmTiXIfgSYECVe6BzZw9CHFCYvTMxKOlwZJmFibwM+ECcuWfBPwHI49CY+6sCt3u9Osf+h5c6/VhPoM7eoT7vUBUMvlxGG91o/Jz+t3E1tQ2Zh3mwlNR732r6k6m6VOBE841DtUf5E9qrOFTlg7Sj5fmMc/SyUd9Sahb27CPpz6+HRrcffZS7Wlwd1mM7vLbU8Gl0roC9jCs4O+l3p2qqOE7pZOpN3RRD3hJx+Id/6DirsDKaUvac/REs7jlzPs/tlr42Cb589evTPvQuXLBdnCM+3Puxj9R8L+I2H/kbD/SNh/JOw/EvYfCfvv/0n4+/8f//d/UyHYdzEC08NV25DfNunEIuT3abqwjIJ+Y6gDxRsWv7meVq/jhPrWV3D6W19R8b22i38/LbTT77UBAAAAAAAAAAAAAAAAAAAAAAAAAAAA+Fn+AcQeSPEits5/AAAAAElFTkSuQmCC",
  5: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAABmZmYsLCzh4eGPj49qamry8vLs7OwRERFISEjAwMC0tLSTk5PPz8/39/fm5uba2to7Ozt2dnaBgYFOTk6qqqrV1dUICAgwMDBCQkIZGRleXl7Ozs7Hx8ednZ2IiIgcHBwlJSVUVFT0aaeVAAAD20lEQVR4nO3ca3OiMBiGYfCI2lVRqKjUw/b//8etQsDOkgMSYtO5ry+7M2BeHwwQAiUIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPxMy+SwH/YsXTwUXKR9lxsekmVVLt6ETrxXFd/dFNzE5fZ0Uy4Mj1XCo6uS936zc1UtDFdlwJW7kruvco666Jdh9RsOndXcOOyjZZdxu2Pcim7L/+WDniW7h2PpLpn0bFDm2ooOs+58xvlp1kWwYZDd/01e/X16kNyTZUGRdPzqr9ODcRGNhB4jof9I6D8S+o+E/iOh/0joPxL6j4Slj9DYMf8z0hRdnwfX5g9PihUi83JZetkpixkm/GNe8v5Fp4qSq0T+wWvxwZbTjJ+qTWqYcNyuZJjJJ+2iveJzx6cShuGpc8JT25KZ9FdUTnTnxTrrtuXCuGvCIBqZiE9iZjncShq6iBUmp/j/BsRaU6Nyo49q79l3TmjsTdRs7qfV3Zhz91I3sWhvIVvD/tlioIwg9rCNhUp34lfMZSvYTyhu000al4rj6JuFSneiUxxkK9hPOCpLzhuX5uXSZePSZ5S3WWeRZLn9hNGsaGvYuHReJlSdMNsRLcrOT65/Q/sJyw36V9ai/YRL5X5oPeFUtx8Wh6Kjs2Op9YTiWCq9MVgMqbc9nA+bx4q2E4p9QjGouRR92CzhaqoWLXRjGsOEukKlUzVeThWNxW+34YBJwsVkFpq6Sg7eZgnbj0v1fUKfcJWra3wn6zRmCVtfW6gvEc0STts8/DJYyZrpKaHBKFeb8LNubqZy3adnxQWpWcJomCmLCPV30o+RdAmrrZov15GKZocwPZYqa1RG1bN/+pG8LqF4KEx22Weqt7OFdk/UJKwa6vqNrJ/xL6abXpNQdNLOjxRZTygugZuHwQ80CUV/73xlbn/kXTYoHXkHwTlPRtqEYvTX+cLVfsLyLJbJrg+D9LY4dp5QesJ8tkVpwmKgnDpLKCZLu7ZTO2p6aTF01T65ZythNV3fsZ2arXkaWwnPZTtdT6s17fWh24TxzNKWqlsUnUJ6xu8tYcOs9dJghlr+6SZ1i5/SpvpKWG3bRh+aT7e/PpSeK3pLqPxzGOkMvND26ilTjEpfkHAun1J5MuFA/gsaJxRT9aqmvhk1fpUwm19MZrtb3AOepWP1FuM+vv9I6D8S+o+E/iOh/0joPxL6j4T+I6H/RMLf//f4v/+dCs7ei+GYeERm6/I1Iy+xcPl+mle4Parh8B1DL3CfE//N/bS8jeDqXV/ObepJ8WVy6P39aa49vq8NAAAAAAAAAAAAAAAAAAAAAAAAAAAAwM/yD/CAPUr5xs8VAAAAAElFTkSuQmCC",
  6: "data:image/png;base64,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",
  7: "data:image/png;base64,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",
  8: "https://www.nicepng.com/png/detail/25-251632_open-mobile-icon-png.png",
};

const PartyDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { partyId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const currentParty = useSelector((state) => state.parties[partyId]);
  const myRequests = useSelector((state) => state.session.myRequests);
  const requestsForMe = useSelector((state) => state.session.requestsForMe);
  const currentPartyUsers = useSelector((state) => state.partyuser[partyId]);
  const [iAmMember, setIAmMember] = useState(false);
  const [errors, setErrors] = useState([]);

  const [requested, setRequested] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOneParty(partyId)).then(async (res) => {
      if (res && res.errors) setErrors(res.errors);
    });
    dispatch(fetchAllPartyUsers(partyId));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchPartyRequests(sessionUser.id));
      dispatch(fetchRequestsForMyParty(partyId));
    }
    if (currentPartyUsers && currentPartyUsers[sessionUser?.id]){
      setIAmMember(true);
    }
  }, [sessionUser, currentPartyUsers]);
  useEffect(() => {
    if (myRequests && myRequests[partyId]) setRequested(true);
  }, [myRequests]);



  const usersWhoSentRequests = [];
  // turn data back to array
  for (const user in requestsForMe) {
    usersWhoSentRequests.push(requestsForMe[user]);
  }

  const currentMembers = [];
  // turn data back to array
  for (const user in currentPartyUsers) {
    currentMembers.push(currentPartyUsers[user]);
  }

  //test the route to see id partyId is only digits, if not redirect to '/'
  const validDigits = /^\d+$/;
  if (!validDigits.test(partyId)) return <Redirect to="/" />;

  const handleRequest = (e) => {
    e.preventDefault();
    if (sessionUser && currentParty.space > currentMembers.length) {
      // alert("request sent!");
      return dispatch(sendPartyRequest(sessionUser.id, partyId));
    } else if (sessionUser && currentParty.space >= currentMembers.length) {
      alert("Sorry! This party is full.")
    } else history.push(`/login`);
  };

  const handleRemoveRequest = (e) => {
    if (sessionUser) {
      // alert("request deleted!");
      return dispatch(deletePartyRequest(sessionUser.id, partyId)).then(
        async (res) => {
          setRequested(false);
        }
      );
    } else history.push(`/login`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/parties/${partyId}/edit`);
  };

  return (
    <div className="party-detail-page">
      <ul className="login-errors">
        {errors.map((error, i) => (
          <li key={error} className="page-not-found-error">
            {error}
          </li>
        ))}
      </ul>
      {currentParty && (
        <>
          <div className="party-banner-img-container">
            <img
              crossOrigin="anonymous"
              src={currentParty?.Videogame?.Image?.url}
            ></img>
          </div>
          <h1>{currentParty.name}</h1>

          <div className="party-info-group">
            <div className="party-clan-image">
              {currentParty?.Image?.url ? (
                <img
                  crossOrigin="anonymous"
                  src={currentParty?.Image?.url}
                ></img>
              ) : (
                <img crossOrigin="anonymous" src={favicon}></img>
              )}
            </div>
            <div className="home-page-vl"></div>
            <div className="party-platform-icon">
              <img
                crossOrigin="anonymous"
                src={platformIcons[currentParty?.Videogame?.platformId]}
              ></img>
            </div>
            <div className="detail-page-vl"></div>
            <div className="party-member-container">
              <p>Members</p>
              <div className="party-member-count">
                {`${currentMembers?.length}/${currentParty.space}`}
              </div>
            </div>
            <div className="detail-page-vl"></div>
            <div className="party-create-time-container">
              <p>Since</p>
              <div className="party-create-time">
                {currentParty.createdAt.substring(0, 10)}
              </div>
            </div>
          </div>

          <div className="party-host-container">
            <p>
              Host by:
              <span>
                {currentParty?.User?.Image ? (
                  <img
                    crossOrigin="anonymous"
                    src={currentParty.User.Image.url}
                  ></img>
                ) : (
                  <img src={anonymousPerson}></img>
                )}
              </span>
              {currentParty?.User?.username === sessionUser?.username
                ? `${currentParty?.User?.username} (you)`
                : currentParty?.User?.username}
            </p>
          </div>

          <div className="party-detail-description">
            {currentParty?.description}
          </div>
          <hr className="party-detail-hr" />
          <div className="party-detail-game-info">
            <h2>About this game: {currentParty?.Videogame?.name}</h2>
            <p>{currentParty?.Videogame?.description}</p>
          </div>
          <hr className="party-detail-hr" />

          <div className="party-detail-game-info">
            <h2>Current member:</h2>
            <div className="current-member-container">
              {currentMembers?.length
                ? currentMembers.map((user) => {
                    return (
                        <CurrentMemberTag
                          key={`currentMember-${user.username}`}
                          user={user}
                          sessionUser={sessionUser}
                          currentParty={currentParty}
                          partyId={partyId}
                        />
                    );
                  })
                : <div>No member yet...</div>}
            </div>
          </div>

          {usersWhoSentRequests.length &&
            sessionUser?.id === currentParty?.ownerId && (
              <div className="user-request-container">
                <h2>Pending requests:</h2>
                {usersWhoSentRequests.map((user) => {
                  return (
                    <PendingRequest
                      key={`pendingRequests-${user.id}`}
                      user={user}
                      sessionUser={sessionUser}
                      partyId={partyId}
                    />
                  );
                })}
              </div>
            )}

          {sessionUser && sessionUser?.id === currentParty?.User?.id && (
            <div className="user-party-control-btn">
              <button
                type="button"
                className="party-detail-edit-btn"
                onClick={handleEdit}
              >
                Edit party
              </button>
            </div>
          )}
          {/* vvvvvvv I am not logged in and space not full */}
          { !sessionUser && currentParty?.space > currentMembers?.length && (
            <button
              type="button"
              className="party-detail-request-btn"
              onClick={handleRequest}
            >
              Request to join
            </button>
          )}
          {/* vvvvvvv I am logged in && space not full && not onwer && not requested && not member */}
          { sessionUser
          && currentParty?.space > currentMembers?.length
          && sessionUser?.id !== currentParty?.User?.id
          && !requested
          && !iAmMember
          && (
            <button
              type="button"
              className="party-detail-request-btn"
              onClick={handleRequest}
            >
              Request to join
            </button>
          )}
          { myRequests && myRequests[currentParty?.id] && (
            <button
              type="button"
              className="party-detail-remove-request-btn"
              onClick={handleRemoveRequest}
            >
              Remove request
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PartyDetail;
