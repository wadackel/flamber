// @flow
import _ from "lodash";
import { normalize, arrayOf } from "normalizr";
import OptionSchema from "../schemas/option";
import type { Options, OptionValues } from "../types/options";


const normalizeOptions = (value: { options: Options }): OptionValues => {
  const normalized = normalize(value, { options: arrayOf(OptionSchema) });
  const entities = normalized.entities.options;

  return _.zipObject(
    _.map(entities, o => o.name),
    _.map(entities, o => o.value)
  );
};


export default normalizeOptions;
