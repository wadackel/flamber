import { normalize, arrayOf } from "normalizr";
import { put, call, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { getItemEntityById } from "../../selectors/items";


export function *callUpdateItem(payload, success, failure) {
  const entity = yield select(getItemEntityById, payload.id);
  const {
    id, // eslint-disable-line no-unused-vars
    ...props
  } = payload;
  const newEntity = { ...entity, ...props };

  try {
    const response = yield call(Services.updateItems, [newEntity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(success(normalized));
  } catch (error) {
    yield put(failure(error, payload));
  }
}
