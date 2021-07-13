module.exports = {
  stories: ['../storybook/**/*.stories.js'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
    };
    config.resolve.extensions = ['.web.js', '.js', '.json'];
    // mutate babel-loader
    config.module.rules[0].use[0].options.plugins.push(['react-native-web', { commonjs: true }]);
    return config;
  },
};