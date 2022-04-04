import { parkingReducer, IParkingReducer } from '../redux/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from "redux";

export interface IAppState {
  parkingState: IParkingReducer,
};

const rootReducer = combineReducers<IAppState>({
  parkingState: parkingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export { store };