module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... any other Babel plugins you might have
      'react-native-reanimated/plugin', // This MUST be the last plugin
    ],
  };
};