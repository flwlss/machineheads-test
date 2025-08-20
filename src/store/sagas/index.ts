import { takeEvery, put, call, fork, all, select, takeLeading } from "redux-saga/effects";
import { LOCATION_CHANGE } from 'connected-react-router';
import { setAuthTokens, setPagination, setAuthError } from "../actions";
import type { Author } from "../../types/authors";
import type { Tag } from "../../types/tags";
import Cookies from 'js-cookie';
import type { AuthCredentials, AuthError, AuthTokens } from '../../types/auth';
import {
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  EDIT_POST_REQUEST,
  LOGIN_REQUEST,
  PAGE_CHANGE,
  SET_ALL_AUTHORS_TO_SELECT,
  SET_ALL_TAGS_TO_SELECT,
  SET_DETAIL_POST_REQUEST
} from '../constants';
import { api, authAPI, contentAPI, storeTokens, TOKEN_KEY } from '../../api';
import { PATHS } from "../../navigation/paths";
import type { DetailPost } from "../../types/posts";
import { setAllPosts, setDetailPost } from "../actions/post";
import { setAllAuthors } from "../actions/author";
import { setAllTags } from "../actions/tag";

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

export function* handleCreatePost(action: { type: string; payload: FormData }) {
  try {
    yield call(contentAPI.addPost, action.payload);
    yield put({
      type: PAGE_CHANGE,
      payload: { page: 1 }
    });
  } catch (error) {
    console.error('Failed to create post:', error);
  }
}

export function* handleDeletePost(action: { type: string; payload: number }) {
  try {
    yield call(contentAPI.deletePost, action.payload);
    const currentPage: number = yield select(
      (state) => state.pagination.posts?.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage }
    });
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
}

export function* handleDetailPost(action: { type: string; payload: number }) {
  try {
    const detailPost: DetailPost = yield call(contentAPI.getDetailPost, action.payload);
    yield put(setDetailPost(detailPost));
  } catch (error) {
    console.error('Failed to get detail post:', error);
  }
}

export function* handleEditPost(action: { type: string; payload: FormData, id: number }) {
  try {
    yield call(contentAPI.editPost, action.id, action.payload);
    const currentPage: number = yield select(
      (state) => state.pagination.posts?.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage }
    });
  } catch (error) {
    console.error('Failed to edit post:', error);
  }
}

export function* watchCreatePost() {
  yield takeEvery(CREATE_POST_REQUEST, handleCreatePost);
}

export function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, handleDeletePost);
}

export function* watchDetailPost() {
  yield takeEvery(SET_DETAIL_POST_REQUEST, handleDetailPost);
}

export function* watchEditPost() {
  yield takeEvery(EDIT_POST_REQUEST, handleEditPost);
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

export function* watchTagsSelect() {
  yield takeEvery(SET_ALL_TAGS_TO_SELECT, handleAllTags);
}

export function* watchAuthorsSelect() {
  yield takeEvery(SET_ALL_AUTHORS_TO_SELECT, handleAllAuthors);
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
  ]);
}