module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    // 원하는 규칙 추가하기
    "rules": {
        "quotes": ["error", "single"],
        "no-duplicate-imports": "error",
        "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
        "no-unused-vars": "error",
        "no-multiple-empty-lines": "error",

        // error 해결하기 위해서 추가한 규칙
        "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
}
