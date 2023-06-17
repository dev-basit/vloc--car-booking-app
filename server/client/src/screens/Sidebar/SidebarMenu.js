import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import { sidebarFeatures } from "../../config/inputs";
import { AuthContext } from "../../context/AuthContext";
import { getClient } from "../../controllers/clients";

function SidebarMenu() {
  const [userInfo, setUserInfo] = useState({}); // we will get this once the page loads
  const { currentUser, dispatch } = useContext(AuthContext);
  const history = useHistory();

  console.log("useInfo  ", userInfo);

  useEffect(() => {
    getClient(currentUser.uid)
      .then((data) => setUserInfo(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Screen className="sidebar">
      <section className="profilePicContainer">
        <button type="button" onClick={history.goBack}>
          <AiFillCloseCircle style={{ position: "absolute", top: "10", left: "20" }} size={25} />
        </button>
        {userInfo.profilePic && (
          <img src={userInfo.profilePic} alt="Profile Pic" className="profilePic" />
        )}
        <h3>{userInfo.firstName}</h3>
        <section>
          {userInfo.isApproved === "Yes" && <Link to="/admin">Contrôle administrateur</Link>}
        </section>
      </section>

      <section className="sideBarMenu">
        {sidebarFeatures.map((item) => {
          return (
            <Link to={item.goto} className="sideBarItem">
              <button>
                <img src={item.icon} alt={item.title} />
                <p>{item.title}</p>
              </button>
            </Link>
          );
        })}
      </section>

      <Link to="/login" className="sideBarItem reactRouterDomLink">
        <AppButton
          text="Se déconnecter"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
          }}
        />
      </Link>
    </Screen>
  );
}

export default SidebarMenu;
