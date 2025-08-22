import { createStore, applyMiddleware, compose, type Store } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { rootReducer, type RootState } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (
  preloadedState?: Partial<RootState>
): Store<RootState> =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
const store = configureStore({});

sagaMiddleware.run(rootSaga);

export default store;
