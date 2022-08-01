const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  addons: [
    {
      name: "storybook-addon-sass-postcss",
      options: {
        sassLoaderOptions: {
          implementation: require("sass"),
        },
      },
    },
  ],
};
