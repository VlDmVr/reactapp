export default function allProducts(state={}, action){
    switch(action.type){
      case "PRELOAD_ALL_DATA":
        return ({
          ...state,
          data: action.payload
        });
      default:
        return state;
    }
  }