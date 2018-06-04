export default function countRows(state={}, action){
    switch(action.type){
      case "COUNT_ROWS":
        return ({
          ...state,
          cntRows: action.payload
        });
      default:
        return state;
    }
}