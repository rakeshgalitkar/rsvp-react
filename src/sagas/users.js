import { takeEvery, fork, call, put } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data }));
  } catch (e) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to get the users",
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const userSagas = [fork(watchGetUsersRequest)];

export default userSagas;
