export default function allProducts(state={}, action){
    switch(action.type){
      case "COPY_ALL_DATA":
        return ({
          ...state,
          dataCopy: action.payload
        });
      default:
        return state;
    }
  }