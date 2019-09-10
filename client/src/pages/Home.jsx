import React, { useEffect, useContext } from "react";
import AuthContext from "../context/Auth/authContext";
const Home = props => {
  const authContext = useContext(AuthContext);
  const { setUser, user } = authContext;

  useEffect(() => {
    if (localStorage.getItem("utoken")) {
      setUser();
    } else {
      props.history.push("/login");
    }
  }, []);
  console.log(user);
  return (
    user !== null && (
      <div className='row'>
        <div className='col-md-6'>Welcome User, {user.name}</div>
      </div>
    )
  );
};

export default Home;
