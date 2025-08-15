import { takeEvery, put, call, fork, all, select, takeLeading } from "redux-saga/effects";
import { LOCATION_CHANGE } from 'connected-react-router';
import { setAllPosts, setAllAuthors, setAllTags, setAuthTokens } from "../actions";
import type { Post } from "../../types/posts";
import type { Author } from "../../types/authors";
import type { Tag } from "../../types/tags";
import Cookies from 'js-cookie';
import type { AuthCredentials, AuthTokens } from '../../types/auth';
import { LOGIN_REQUEST } from '../constants';
import { api, authAPI, contentAPI, storeTokens, TOKEN_KEY } from '../../api';

interface AuthResponse extends AuthTokens {
  expiresIn?: number;
}

export function* handleLogin(action: { type: string; payload: AuthCredentials }) {
  try {
    const response: AuthResponse = yield call(authAPI.login, action.payload);
    yield put(setAuthTokens(response));
    storeTokens(response);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

export function* handleAllAuthors() {
  try {
    const authors: Author[] = yield call(contentAPI.getAuthors);
    yield put(setAllAuthors(authors));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
  }
}

export function* handleAllPosts() {
  try {
    const posts: Post[] = yield call(contentAPI.getPosts);
    yield put(setAllPosts(posts));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
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

  if (path === '/authors') {
    yield call(handleAllAuthors);
  }
  if (path === '/posts') {
    yield call(handleAllPosts);
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
    fork(watchLoginSaga)
  ]);
}