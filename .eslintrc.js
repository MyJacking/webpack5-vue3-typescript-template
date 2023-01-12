module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        'import/resolver': {
            alias: [
                ['@', './src/'],
                ['@component', './src/package/modules/'],
            ],
        },
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: ['plugin:vue/vue3-essential', 'airbnb-base', 'plugin:@typescript-eslint/recommended', '@vue/prettier'],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indet: 'off',
        semi: ['error', 'always'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'class-methods-use-this': 'off',
        'new-cap': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'vue/multi-word-component-names': 'off',
        'no-restricted-syntax': 'off',
        'import/order': 'off',
        'global-require': 'off',
        'no-restricted-globals': 'off',
        'no-shadow': 'off',
        'no-plusplus': 'off',
        'consistent-return': 'off',
        eqeqeq: 'off',
        'guard-for-in': 'off',
        'no-param-reassign': 'off',
        'no-cond-assign': 'off',
        'array-callback-return': 'off',
        'no-return-assign': 'off',
        'default-param-last': 'off',
        radix: 'off',
        'import/no-mutable-exports': 'off',
        'prefer-destructuring': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-underscore-dangle': 'off',
        'dot-notation': 'off',
        'no-inner-declarations': 'off',
        'default-case': 'off',
        'no-use-before-define': 'off',
        'no-undef': 'off',
        'import/no-duplicates': 'off',
        'import/first': 'off',
        '@typescript-eslint/no-unused-vars': 'off', // 未使用的变量警告
        // 设置单行最大长度
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                tabWidth: 4,
                printWidth: 800,
                singleQuote: true,
                semi: true,
                trailingComma: 'es5',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                arrowParens: 'avoid',
            },
        ],
    },
};
