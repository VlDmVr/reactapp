import { combineReducers } from 'redux';
import selectId from './selectId';
import preloadAllData from './preloadAllData';

export default combineReducers({
    selectId,
    preloadAllData
});