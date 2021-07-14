module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            app: './src/app',
            i18n: './src/i18n',
            lib: './src/lib',
            navigation: './src/navigation',
            services: './src/services',
            stores: './src/stores',
            storybook: './storybook',
            views: './src/views',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
            '.stories.tsx',
          ],
        },
      ],
    ],
  }
}
