// https://docs.expo.dev/guides/using-eslint/
// EXPO SDK 53 이상에서부터 defineConfig를 사용할 수 있어, eslint 버전을 낮추고 legacy 설정을 사용합니다.
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    "public",
    "src/assets",
    ".eslintrc.js",
    "commitlint.config.js",
    "babel.config.js",
    "metro.config.js",
    "expo-env.d.ts",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "import/namespace": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: false,
    },
  },
};
