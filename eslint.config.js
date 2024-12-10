// Import the JavaScript configurations from the ESLint package
import js from '@eslint/js'

// Import the Vue plugin configurations for ESLint
import pluginVue from 'eslint-plugin-vue'

// Import the skipFormatting configuration from the Vue ESLint Prettier package
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// Export the ESLint configuration as an array of configuration objects
export default [
  {
    // Define a configuration object for files to lint
    name: 'app/files-to-lint',
    // Specify the file patterns to be linted, including JavaScript and Vue files
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    // Define a configuration object for files to ignore
    name: 'app/files-to-ignore',
    // Specify the file patterns to be ignored, such as distribution and coverage folders
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Include the recommended JavaScript configurations from ESLint
  js.configs.recommended,

  // Spread the essential flat configurations from the Vue ESLint plugin
  ...pluginVue.configs['flat/essential'],

  // Include the configuration to skip formatting from Prettier
  skipFormatting,
]
