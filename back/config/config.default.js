/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1748875566700_1675";

  // add your middleware config here
  // 加载 errorHandler 中间件

  config.middleware = ["errorHandler"];

  // 只对以 /api 为前缀的 URL 路径生效
  config.errorHandler = {
    match: "/api",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
