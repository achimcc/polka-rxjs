// Copyright 2017-2021 @polkadot/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Registry, TypeDef, CodecArg } from "@polkadot/types/types";
import type { RawParam, RawParams } from "./types";

import { isUndefined } from "@polkadot/util";

import getInitValue from "./initValue";
import { AbiParam } from "@polkadot/api-contract/types";

export function createValue(
  registry: Registry,
  param: { type: TypeDef }
): RawParam {
  const value = getInitValue(registry, param.type);

  return {
    isValid: !isUndefined(value),
    value,
  };
}

export default function createValues(
  registry: Registry,
  params: { type: TypeDef }[]
): RawParam[] {
  return params.map((param) => createValue(registry, param));
}

export function extractValues(values: RawParam[]): CodecArg[] {
  return values.map(({ value }) => value as CodecArg);
}

export const computeValues = (
  params: AbiParam[],
  registry: Registry
): CodecArg[] => {
  let values: RawParams;
  values = params.reduce(
    (result: RawParams, param, index): RawParams => [
      ...result,
      values && values[index] ? values[index] : createValue(registry, param),
    ],
    []
  );
  return extractValues(values);
};
