const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("css");
config.resolver.assetExts.push("png", "jpg", "jpeg", "gif", "svg");

module.exports = config;
