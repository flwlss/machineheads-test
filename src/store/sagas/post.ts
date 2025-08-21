import { call, put, select, takeEvery } from "redux-saga/effects";
import { postApi } from "../../api/post";
import { setPagination } from "../actions";
import { setAllPosts, setDetailPost } from "../actions/post";
import {
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  EDIT_POST_REQUEST,
  PAGE_CHANGE,
  SET_DETAIL_POST_REQUEST,
  SET_POST_VALIDATION_ERRORS
} from "../constants";
import type { DetailPost } from "../../types/posts";

export function* handleAllPosts(action?: { payload: { page: number } }) {
  try {
    const page = action?.payload?.page || 1;
    const { data: posts, pagination } = yield call(postApi.getPosts, page);
    yield put(setAllPosts(posts));
    yield put(setPagination(pagination));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

export function* watchPageChange() {
  yield takeEvery(PAGE_CHANGE, handleAllPosts);
}

export function* handleCreatePost(action: { type: string; payload: FormData }) {
  try {
    yield call(postApi.addPost, action.payload);
    const currentPage: number = yield select(
      (state) => state.pagination.posts?.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage }
    });
    yield put({
      type: SET_POST_VALIDATION_ERRORS,
      payload: null
    });
  } catch (error) {
    console.error('Failed to create post:', error);
    yield put({
      type: SET_POST_VALIDATION_ERRORS,
      payload: error
    });
  }
}

export function* watchCreatePost() {
  yield takeEvery(CREATE_POST_REQUEST, handleCreatePost);
}

export function* handleDetailPost(action: { type: string; payload: number }) {
  try {
    const detailPost: DetailPost = yield call(postApi.getDetailPost, action.payload);
    yield put(setDetailPost(detailPost));
  } catch (error) {
    console.error('Failed to get detail post:', error);
  }
}

export function* watchDetailPost() {
  yield takeEvery(SET_DETAIL_POST_REQUEST, handleDetailPost);
}

export function* handleEditPost(action: { type: string; payload: FormData, id: number }) {
  try {
    yield call(postApi.editPost, action.id, action.payload);
    const currentPage: number = yield select(
      (state) => state.pagination.posts?.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage }
    });
    yield put({
      type: SET_POST_VALIDATION_ERRORS,
      payload: null
    });
  } catch (error) {
    yield put({
      type: SET_POST_VALIDATION_ERRORS,
      payload: error
    });
    console.error('Failed to edit post:', error);
  }
}

export function* watchEditPost() {
  yield takeEvery(EDIT_POST_REQUEST, handleEditPost);
}

export function* handleDeletePost(action: { type: string; payload: number }) {
  try {
    yield call(postApi.deletePost, action.payload);
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

export function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, handleDeletePost);
}



