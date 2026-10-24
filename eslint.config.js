const globals = {
  window: 'readonly', document: 'readonly', navigator: 'readonly', localStorage: 'readonly',
  module: 'readonly', require: 'readonly', process: 'readonly', console: 'readonly',
  setTimeout: 'readonly', Blob: 'readonly', URL: 'readonly', FormData: 'readonly',
  Intl: 'readonly', Date: 'readonly', Math: 'readonly', JSON: 'readonly', String: 'readonly',
  Number: 'readonly', Array: 'readonly', Object: 'readonly', RegExp: 'readonly', Error: 'readonly',
  TypeError: 'readonly', RangeError: 'readonly', confirm: 'readonly', prompt: 'readonly',
  alert: 'readonly', globalThis: 'readonly', crypto: 'readonly', setInterval: 'readonly',
  clearTimeout: 'readonly', clearInterval: 'readonly', fetch: 'readonly', Headers: 'readonly',
  Request: 'readonly', Response: 'readonly', URLSearchParams: 'readonly', AbortController: 'readonly',
  Buffer: 'readonly', __dirname: 'readonly', exports: 'writable'
};

module.exports = [
  {
    ignores: ['node_modules/**', 'coverage/**', '.git/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals
    },
    rules: {
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }]
    }
  }
];
