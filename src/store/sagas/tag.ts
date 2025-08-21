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
  SET_TAG_VALIDATION_ERRORS
} from "../constants";

export function* handleAllTags() {
  try {
    const tags: Tag[] = yield call(tagApi.getTags);
    yield put(setAllTags(tags));
  } catch (error) {
    console.error('Failed to fetch tags:', error);
  }
}

export function* watchTagsSelect() {
  yield takeEvery(SET_ALL_TAGS_TO_SELECT, handleAllTags);
}

export function* handleCreateTag(action: { type: string; payload: FormData }) {
  try {
    yield call(tagApi.addTag, action.payload);
    yield put({
      type: SET_TAG_VALIDATION_ERRORS,
      payload: null
    });
    yield call(handleAllTags);
  } catch (error) {
    console.error('Failed to create tag:', error);
    yield put({
      type: SET_TAG_VALIDATION_ERRORS,
      payload: error
    });
  }
}

export function* watchCreateTag() {
  yield takeEvery(CREATE_TAG_REQUEST, handleCreateTag);
}

export function* handleDetailTag(action: { type: string; payload: number }) {
  try {
    const detailTag: Tag = yield call(tagApi.getDetailTag, action.payload);
    yield put(setDetailTag(detailTag));
  } catch (error) {
    console.error('Failed to get detail tag:', error);
  }
}

export function* watchDetailTag() {
  yield takeEvery(SET_DETAIL_TAG_REQUEST, handleDetailTag);
}

export function* handleEditTag(action: { type: string; payload: FormData, id: number }) {
  try {
    yield call(tagApi.editTag, action.id, action.payload);
    yield put({
      type: SET_TAG_VALIDATION_ERRORS,
      payload: null
    });
    yield call(handleAllTags);
  } catch (error) {
    yield put({
      type: SET_TAG_VALIDATION_ERRORS,
      payload: error
    });
    console.error('Failed to edit tag:', error);
  }
}

export function* watchEditTag() {
  yield takeEvery(EDIT_TAG_REQUEST, handleEditTag);
}

export function* handleDeleteTag(action: { type: string; payload: number }) {
  try {
    yield call(tagApi.deleteTag, action.payload);
    yield call(handleAllTags);
  } catch (error) {
    console.error('Failed to delete tag:', error);
  }
}

export function* watchDeleteTag() {
  yield takeEvery(DELETE_TAG_REQUEST, handleDeleteTag);
}