import { takeEvery, put, call, fork, all, select, takeLeading } from "redux-saga/effects";
import { LOCATION_CHANGE } from 'connected-react-router';
import { setAllPosts, setAllAuthors, setAllTags, setAuthTokens, setPagination, setAuthError } from "../actions";
import type { Author } from "../../types/authors";
import type { Tag } from "../../types/tags";
import Cookies from 'js-cookie';
import type { AuthCredentials, AuthError, AuthTokens } from '../../types/auth';
import { LOGIN_REQUEST, PAGE_CHANGE } from '../constants';
import { api, authAPI, contentAPI, storeTokens, TOKEN_KEY } from '../../api';
import { PATHS } from "../../navigation/paths";

export function* handleLogin(action: { type: string; payload: AuthCredentials }) {
  try {
    const response: AuthTokens = yield call(authAPI.login, action.payload);
    yield put(setAuthTokens(response));
    yield put(setAuthError(null));
    storeTokens(response);
    window.location.href = PATHS.POSTS
    // поправить ^^^^
  } catch (error) {
    console.error('Login failed:', error);
    const message = error as AuthError;
    yield put(setAuthError(message.response.data.message));
  }
}

export function* handleAllPosts(action?: { payload: { page: number } }) {
  try {
    const page = action?.payload?.page || 1;
    const { data: posts, pagination } = yield call(contentAPI.getPosts, page);
    yield put(setAllPosts(posts));
    yield put(setPagination(pagination));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

export function* watchPageChange() {
  yield takeEvery(PAGE_CHANGE, handleAllPosts);
}

export function* handleAllAuthors() {
  try {
    const authors: Author[] = yield call(contentAPI.getAuthors);
    yield put(setAllAuthors(authors));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
  }
}

export function* handleAllTags() {
  try {
    const tags: Tag[] = yield call(contentAPI.getTags);
    yield put(setAllTags(tags));
  } catch (error) {
    console.error('Failed to fetch tags:', error);
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
    fork(watchPageChange)
  ]);
}