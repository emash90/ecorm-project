import handleCart from './handleCart'
import Auth from './handleAuth';
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleCart,
    Auth
})
export default rootReducers