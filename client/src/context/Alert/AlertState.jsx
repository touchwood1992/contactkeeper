import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../../context/types";
import uuid from "uuid";
const AlertState = props => {
  const defaultState = { alerts: [] };
  const [state, dispatch] = useReducer(alertReducer, defaultState);
  const setAlerts = (msg, type, timeout = 2000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };
  return (
    <AlertContext.Provider value={{ alerts: state.alerts, setAlerts }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
