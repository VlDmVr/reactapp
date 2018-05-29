import { combineReducers } from 'redux';
import selectId from './selectId';
import preloadAllData from './preloadAllData';
import copyAllData from './copyAllData';

export default combineReducers({
    selectId,
    preloadAllData,
    copyAllData
});