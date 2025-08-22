import { call, put, takeEvery } from "redux-saga/effects";
import { tagApi } from "../../api/tag";
import type { Tag } from "../../types/tags";
import { setAllTags, setDetailTag } from "../actions/tag";
import {
  CREATE_TAG_REQUEST,
  DELETE_TAG_REQUEST,
  EDIT_TAG_REQUEST,
  SET_ALL_TAGS_TO_SELECT,
  SET_DETAIL_TAG_REQUEST,
  SUCCESS_REQUEST,
} from "../constants";
import { setLoading, setValidationError } from "../actions";
import type { ValidationError } from "../../types/posts";

export function* handleAllTags() {
  try {
    yield put(setLoading(true));
    const tags: Tag[] = yield call(tagApi.getTags);
    yield put(setAllTags(tags));
  } catch (error) {
    console.error("Failed to fetch tags:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchTagsSelect() {
  yield takeEvery(SET_ALL_TAGS_TO_SELECT, handleAllTags);
}

export function* handleCreateTag(action: { type: string; payload: FormData }) {
  try {
    yield put(setLoading(true));
    yield call(tagApi.addTag, action.payload);
    yield put(setValidationError(null));
    yield call(handleAllTags);
    yield put({ type: SUCCESS_REQUEST, payload: true });
  } catch (error) {
    const errorMessages = error as ValidationError[];
    console.error("Failed to create tag:", error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchCreateTag() {
  yield takeEvery(CREATE_TAG_REQUEST, handleCreateTag);
}

export function* handleDetailTag(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    const detailTag: Tag = yield call(tagApi.getDetailTag, action.payload);
    yield put(setDetailTag(detailTag));
  } catch (error) {
    console.error("Failed to get detail tag:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDetailTag() {
  yield takeEvery(SET_DETAIL_TAG_REQUEST, handleDetailTag);
}

export function* handleEditTag(action: {
  type: string;
  payload: FormData;
  id: number;
}) {
  try {
    yield put(setLoading(true));
    yield call(tagApi.editTag, action.id, action.payload);
    yield put(setValidationError(null));
    yield call(handleAllTags);
    yield put({ type: SUCCESS_REQUEST, payload: true });
    const updatedAuthor: Tag = yield call(tagApi.getDetailTag, action.id);
    yield put(setDetailTag(updatedAuthor));
  } catch (error) {
    const errorMessages = error as ValidationError[];
    console.error("Failed to edit tag:", error);
    yield put(setValidationError(errorMessages));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchEditTag() {
  yield takeEvery(EDIT_TAG_REQUEST, handleEditTag);
}

export function* handleDeleteTag(action: { type: string; payload: number }) {
  try {
    yield put(setLoading(true));
    yield call(tagApi.deleteTag, action.payload);
    yield call(handleAllTags);
  } catch (error) {
    console.error("Failed to delete tag:", error);
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchDeleteTag() {
  yield takeEvery(DELETE_TAG_REQUEST, handleDeleteTag);
}
