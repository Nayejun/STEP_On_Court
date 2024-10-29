import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
   dir: "./",
});

const config: Config = {
   coverageProvider: "v8",
   testEnvironment: "jest-environment-jsdom",
   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
   transformIgnorePatterns: [
      "/node_modules/",
      "^.+\\.module\\.(css|sass|scss)$",
   ],
   moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
      "^@app/(.*)$": "<rootDir>/app/$1",
      "^@components/(.*)$": "<rootDir>/components/$1",
      "^@lib/(.*)$": "<rootDir>/lib/$1",
   },
};

export default createJestConfig(config);
