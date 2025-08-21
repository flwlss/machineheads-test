import { call, put, takeEvery } from "redux-saga/effects";
import { authorApi } from "../../api/author";
import type { Author, DetailAuthor } from "../../types/authors";
import { setAllAuthors, setDetailAuthor } from "../actions/author";
import {
  CREATE_AUTHOR_REQUEST,
  DELETE_AUTHOR_REQUEST,
  EDIT_AUTHOR_REQUEST,
  SET_ALL_AUTHORS_TO_SELECT,
  SET_DETAIL_AUTHOR_REQUEST
} from "../constants";
import { setLoading, setValidationError } from "../actions";
import type { ValidationError } from "../../types/posts";

export function* handleAllAuthors() {
  try {
    yield put(setLoading(true));
    const authors: Author[] = yield call(authorApi.getAuthors);
    yield put(setAllAuthors(authors));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchAuthorsSelect() {
  yield takeEvery(SET_ALL_AUTHORS_TO_SELECT, handleAllAuthors);
}

export function* handleCreateAuthor(action: { type: string; payload: FormData }) {
  try {
    yield put(setLoading(true));
    yield call(authorApi.addAuthor, action.payload);
    yield put(setValidationError(null));
    yield call(handleAllAuthors);
  } catch (error) {
    const errorMessages = error as ValidationError[]
    console.error('Failed to create author:', error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCreateAuthor() {
  yield takeEvery(CREATE_AUTHOR_REQUEST, handleCreateAuthor);
}

export function* handleDetailAuthor(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    const detailAuthor: DetailAuthor = yield call(authorApi.getDetailAuthor, action.payload);
    yield put(setDetailAuthor(detailAuthor));
  } catch (error) {
    console.error('Failed to get detail author:', error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDetailAuthor() {
  yield takeEvery(SET_DETAIL_AUTHOR_REQUEST, handleDetailAuthor);
}

export function* handleEditAuthor(action: { type: string; payload: FormData, id: number }) {
  try {
    yield put(setLoading(true));
    yield call(authorApi.editAuthor, action.id, action.payload);
    yield put(setValidationError(null));
    yield call(handleAllAuthors);
  } catch (error) {
    const errorMessages = error as ValidationError[]
    console.error('Failed to edit author:', error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchEditAuthor() {
  yield takeEvery(EDIT_AUTHOR_REQUEST, handleEditAuthor);
}

export function* handleDeleteAuthor(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    yield call(authorApi.deleteAuthor, action.payload);
    yield call(handleAllAuthors);
  } catch (error) {
    console.error('Failed to delete post:', error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDeleteAuthor() {
  yield takeEvery(DELETE_AUTHOR_REQUEST, handleDeleteAuthor);
}