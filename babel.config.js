module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@shared': './src/shared',
          '@features': './src/features',
          '@assets': './src/assets',
          '@app': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
