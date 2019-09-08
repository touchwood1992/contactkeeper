import { SET_ALERT, REMOVE_ALERT } from "../types";
export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(al => al.id !== action.payload)
      };
    default:
      return { ...state };
  }
};
