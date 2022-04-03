// import { loadingPageReducer, ILoadingPageReducer, } from '../reducers';
// import thunkMiddleware from 'redux-thunk';
import { parkingReducer } from '../redux/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { IParking } from '../types';

export interface IAppState {
  parkingState: IParking,
};

const rootReducer = combineReducers<IAppState>({
  parkingState: parkingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export { store };