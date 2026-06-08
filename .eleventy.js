module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets/app.js");
  eleventyConfig.addPassthroughCopy("src/assets/img");

  if (process.env.ELEVENTY_ENV !== "production") {
    eleventyConfig.addPassthroughCopy("src/assets/image-slot.js");
    eleventyConfig.addPassthroughCopy("src/assets/tweaks-panel.jsx");
    eleventyConfig.addPassthroughCopy("src/assets/tweaks-app.jsx");
  }

  const galClassMap = { large: "g-a", small: "g-b", tall: "g-c", wide: "g-d" };
  eleventyConfig.addFilter("galClass", (size) => galClassMap[size] ?? "g-b");
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
