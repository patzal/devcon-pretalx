// Create slugs for files.
// Slug will used for blog page path.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const [basePath, name] = fileNode.relativePath.split("/");
    slug = `/${basePath}/${name}/`;
  }

  if (slug) {
    // eslint-disable-next-line quotes
    createNodeField({ node, name: `slug`, value: slug });
  }
};
