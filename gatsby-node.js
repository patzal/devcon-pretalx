const path = require("path");

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/talks/)) {
    createPage({
      path: "/talks",
      matchPath: "/talks/*",
      component: path.resolve("src/pages/DetailPage.tsx")
    });
  }
};
