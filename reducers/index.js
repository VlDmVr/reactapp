import { combineReducers } from 'redux';
import selectId from './selectId';
import preloadAllData from './preloadAllData';
import copyAllData from './copyAllData';
import countRows from './countRows';

export default combineReducers({
    selectId,
    preloadAllData,
    copyAllData,
    countRows
});