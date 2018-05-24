export default function allProducts(state={}, action){
    switch(action.type){
      case "SELECT_PRODUCT":
        return ({
          ...state,
          action: payload
        });
      default:
        return state;
    }
  }