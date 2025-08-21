import { takeEvery, put, call, fork, all, select, takeLeading } from "redux-saga/effects";
import { LOCATION_CHANGE, push } from 'connected-react-router';
import { setAuthTokens, setAuthError } from "../actions";
import Cookies from 'js-cookie';
import type { AuthCredentials, AuthError, AuthTokens } from '../../types/auth';
import { LOGIN_REQUEST } from '../constants';
import { api, authAPI, storeTokens, TOKEN_KEY } from '../../api';
import { PATHS } from "../../navigation/paths";
import { handleAllPosts, watchCreatePost, watchDeletePost, watchDetailPost, watchEditPost, watchPageChange } from "./post";
import { handleAllAuthors, watchAuthorsSelect, watchCreateAuthor, watchDeleteAuthor, watchDetailAuthor, watchEditAuthor } from "./author";
import { handleAllTags, watchCreateTag, watchDeleteTag, watchDetailTag, watchEditTag, watchTagsSelect } from "./tag";

export function* handleLogin(action: { type: string; payload: AuthCredentials }) {
  try {
    const response: AuthTokens = yield call(authAPI.login, action.payload);
    yield put(setAuthTokens(response));
    yield put(setAuthError(null));
    storeTokens(response);
    yield put(push(PATHS.POSTS));
  } catch (error) {
    console.error('Login failed:', error);
    const message = error as AuthError;
    yield put(setAuthError(message.response.data.message));
  }
}

export function* watchContentSaga() {
  const path: string = yield select(({ router }) => router.location.pathname);

  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  if (path === '/posts') {
    yield call(handleAllPosts, { payload: { page: 1 } });
  }
  if (path === '/authors') {
    yield call(handleAllAuthors);
  }
  if (path === '/tags') {
    yield call(handleAllTags);
  }
}

export function* watchLoginSaga() {
  yield takeEvery(LOGIN_REQUEST, handleLogin);
}

export default function* rootSaga() {
  yield all([
    takeLeading(LOCATION_CHANGE, watchContentSaga),
    fork(watchLoginSaga),
    fork(watchPageChange),
    fork(watchTagsSelect),
    fork(watchAuthorsSelect),
    fork(watchCreatePost),
    fork(watchDeletePost),
    fork(watchDetailPost),
    fork(watchEditPost),
    fork(watchCreateAuthor),
    fork(watchEditAuthor),
    fork(watchDetailAuthor),
    fork(watchDeleteAuthor),
    fork(watchCreateTag),
    fork(watchDetailTag),
    fork(watchEditTag),
    fork(watchDeleteTag),
  ]);
}