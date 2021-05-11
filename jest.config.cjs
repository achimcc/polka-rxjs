// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require("@polkadot/dev/config/jest.cjs");

const findPackages = require("./scripts/findPackages.cjs");

module.exports = {
  ...config,
  projects: [
    {
      displayName: "all-tests",
      globalSetup: "./jest/globalSetup.ts",
      globalTeardown: "./jest/globalTeardown.ts",
    },
    {
      displayName: "fast-tests",
    },
  ],
  testTimeout: 25000,
};
