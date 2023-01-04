module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-paper/babel'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~core': './src/core',
          '~screens': './src/screens',
          '~components': './src/components',
          '~hooks': './src/hooks',
          '~navigators': './src/navigators',
          '~redux': './src/redux',
          '~api': './src/api',
        },
      },
    ],
  ],
};
