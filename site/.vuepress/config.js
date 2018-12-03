const json = require("../pages.json");
const footer = require("../footer-nav.json");

module.exports = {
  title: "Airship",
  description: "Airship",
  themeConfig: {
    docsDir: "site",
    nav: json.nav,
    footer: footer
  }
};
