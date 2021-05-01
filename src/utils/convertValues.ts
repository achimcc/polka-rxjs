// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from "bn.js";

import { BN_TEN, BN_ZERO, formatBalance, isBn } from "@polkadot/util";
import { SiDef } from "@polkadot/util/types";

enum BitLengthOption {
  CHAIN_SPEC = 128,
  NORMAL_NUMBERS = 32,
}

type BitLength = 8 | 16 | 32 | 64 | 128 | 256;

const DEFAULT_BITLENGTH = BitLengthOption.NORMAL_NUMBERS as BitLength;

function getGlobalMaxValue(bitLength?: number): BN {
  return new BN(2).pow(new BN(bitLength || DEFAULT_BITLENGTH)).subn(1);
}

function getSiPowers(si: SiDef | null): [BN, number, number] {
  if (!si) {
    return [BN_ZERO, 0, 0];
  }

  const basePower = formatBalance.getDefaults().decimals;

  return [new BN(basePower + si.power), basePower, si.power];
}

function isValidNumber(
  bn: BN,
  bitLength: BitLength,
  isZeroable: boolean,
  maxValue?: BN
): boolean {
  if (
    // cannot be negative
    bn.lt(BN_ZERO) ||
    // cannot be > than allowed max
    !bn.lt(getGlobalMaxValue(bitLength)) ||
    // check if 0 and it should be a value
    (!isZeroable && bn.isZero()) ||
    // check that the bitlengths fit
    bn.bitLength() > (bitLength || DEFAULT_BITLENGTH) ||
    // cannot be > max (if specified)
    (maxValue && maxValue.gtn(0) && bn.gt(maxValue))
  ) {
    return false;
  }

  return true;
}

function inputToBn(
  input: string,
  si: SiDef | null,
  bitLength: BitLength,
  isZeroable: boolean,
  maxValue?: BN
): [BN, boolean] {
  const [siPower, basePower, siUnitPower] = getSiPowers(si);

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);

  let result;

  if (isDecimalValue) {
    if (siUnitPower - isDecimalValue[2].length < -basePower) {
      result = new BN(-1);
    }

    const div = new BN(input.replace(/\.\d*$/, ""));
    const modString = input.replace(/^\d+\./, "");
    const mod = new BN(modString);

    result = div
      .mul(BN_TEN.pow(siPower))
      .add(
        mod.mul(BN_TEN.pow(new BN(basePower + siUnitPower - modString.length)))
      );
  } else {
    result = new BN(input.replace(/[^\d]/g, "")).mul(BN_TEN.pow(siPower));
  }

  return [result, isValidNumber(result, bitLength, isZeroable, maxValue)];
}

function getValuesFromString(
  value: string,
  si: SiDef | null,
  bitLength: BitLength,
  isZeroable: boolean,
  maxValue?: BN
): [string, BN, boolean] {
  const [valueBn, isValid] = inputToBn(
    value,
    si,
    bitLength,
    isZeroable,
    maxValue
  );

  return [value, valueBn, isValid];
}

function getValuesFromBn(valueBn: BN, si: SiDef | null): [string, BN, boolean] {
  const value = si
    ? valueBn
        .div(
          BN_TEN.pow(new BN(formatBalance.getDefaults().decimals + si.power))
        )
        .toString()
    : valueBn.toString();

  return [value, valueBn, true];
}

export default function getValues(
  value: BN | string = BN_ZERO,
  si: SiDef | null = null,
  bitLength: BitLength = DEFAULT_BITLENGTH,
  isZeroable: boolean = true,
  maxValue?: BN
): [string, BN, boolean] {
  return isBn(value)
    ? getValuesFromBn(value, si)
    : getValuesFromString(value, si, bitLength, isZeroable, maxValue);
}
