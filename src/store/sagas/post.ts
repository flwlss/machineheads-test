import { call, put, select, takeEvery } from "redux-saga/effects";
import { postApi } from "../../api/post";
import { setLoading, setPagination, setValidationError } from "../actions";
import { setAllPosts, setDetailPost } from "../actions/post";
import {
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  EDIT_POST_REQUEST,
  PAGE_CHANGE,
  SET_DETAIL_POST_REQUEST,
} from "../constants";
import type { DetailPost, ValidationError } from "../../types/posts";
import type { RootState } from "../reducers";

export function* handleAllPosts(action?: { payload: { page: number } }) {
  try {
    yield put(setLoading(true));
    const page = action?.payload?.page || 1;
    const { data: posts, pagination } = yield call(postApi.getPosts, page);
    yield put(setAllPosts(posts));
    yield put(setPagination(pagination));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchPageChange() {
  yield takeEvery(PAGE_CHANGE, handleAllPosts);
}

export function* handleCreatePost(action: { type: string; payload: FormData }) {
  try {
    yield put(setLoading(true));
    yield call(postApi.addPost, action.payload);
    const currentPage: number = yield select(
      (state: RootState) => state.common.pagination.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage },
    });
    yield put(setValidationError(null));
  } catch (error) {
    const errorMessages = error as ValidationError[];
    console.error("Failed to create post:", error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCreatePost() {
  yield takeEvery(CREATE_POST_REQUEST, handleCreatePost);
}

export function* handleDetailPost(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    const detailPost: DetailPost = yield call(
      postApi.getDetailPost,
      action.payload
    );
    yield put(setDetailPost(detailPost));
  } catch (error) {
    console.error("Failed to get detail post:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDetailPost() {
  yield takeEvery(SET_DETAIL_POST_REQUEST, handleDetailPost);
}

export function* handleEditPost(action: {
  type: string;
  payload: FormData;
  id: number;
}) {
  try {
    yield put(setLoading(true));
    yield call(postApi.editPost, action.id, action.payload);
    const currentPage: number = yield select(
      (state: RootState) => state.common.pagination.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage },
    });
    yield put(setValidationError(null));
  } catch (error) {
    const errorMessages = error as ValidationError[];
    console.error("Failed to edit post:", error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchEditPost() {
  yield takeEvery(EDIT_POST_REQUEST, handleEditPost);
}

export function* handleDeletePost(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    yield call(postApi.deletePost, action.payload);
    const currentPage: number = yield select(
      (state: RootState) => state.common.pagination.currentPage || 1
    );
    yield put({
      type: PAGE_CHANGE,
      payload: { page: currentPage },
    });
  } catch (error) {
    console.error("Failed to delete post:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, handleDeletePost);
}
