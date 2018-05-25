export default function allProducts(state={}, action){
    switch(action.type){
      case "SELECT_ID":
        return ({
          ...state,
          row: action.payload
        });
      default:
        return state;
    }
}