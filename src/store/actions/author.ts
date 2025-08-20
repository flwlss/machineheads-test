import type { Author } from "../../types/authors";
import { SET_ALL_AUTHORS } from "../constants";

export const setAllAuthors = (payload: Author[]) => ({
  type: SET_ALL_AUTHORS,
  payload
});