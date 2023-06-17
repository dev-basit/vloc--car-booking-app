const ReservationReducer = (state, { type, payload }) => {
  switch (type) {
    case "addInfo": {
      return {
        reservation: { ...state.reservation, ...payload },
      };
    }

    // test it
    case "clear": {
      return {};
    }

    default:
      return state;
  }
};

export default ReservationReducer;
