const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      let index = state.addresses.findIndex(element => element.id == action.payload.id);
      return { ...state, addresses: index == -1 ? [...state.addresses,action.payload]:[...state.addresses]};
    case "address/remove":
      return {
        ...state,
        addresses: state.addresses.filter((address) => address.id !== action.payload)
      }
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
