export default function paramsSelectedGoodsList(state={}, action){
  switch(action.type){
    case "PARAMS_SELECTED_GOODS_LIST":
      return ({
        ...state,
        params: action.payload
      });
    default:
      return state;
  }
}