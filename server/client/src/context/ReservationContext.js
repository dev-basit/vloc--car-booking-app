import { useEffect, useReducer, createContext } from "react";
import ReservationReducer from "./ReservationReducer";

const INITIAL_STATE = {
  reservation: {},
};

export const ReservationContext = createContext(INITIAL_STATE);

export const ReservationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReservationReducer, INITIAL_STATE);

  useEffect(() => {}, []);

  return (
    <ReservationContext.Provider value={{ reservation: state.reservation, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};
