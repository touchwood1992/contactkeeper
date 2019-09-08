import React, { useContext } from "react";
import AlertContext from "../context/Alert/alertContext";
const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(alert => {
      return (
        <div className={`alert alert-${alert.type}`} key={alert.id}>
          {alert.msg}
        </div>
      );
    })
  );
};
export default Alert;
