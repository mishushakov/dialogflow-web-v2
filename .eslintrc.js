module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
        '@mishushakov',
        '@mishushakov/eslint-config/vue'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    globals: {
        df: {}
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}