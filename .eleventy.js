const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/assets/styles.css");
  eleventyConfig.addPassthroughCopy("src/assets/app.js");

  eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw", loading = "lazy", cssClass = "") {
    const fileSrc = path.join("src", src);
    const metadata = await Image(fileSrc, {
      widths: [400, 800, 1200, 1600],
      formats: ["webp", "auto"],
      outputDir: "./_site/assets/img/",
      urlPath: "/assets/img/",
    });

    const sources = Object.values(metadata)
      .map(fmt => `<source type="${fmt[0].sourceType}" srcset="${fmt.map(f => f.srcset).join(", ")}" sizes="${sizes}">`)
      .join("\n    ");
    const fallback = Object.values(metadata).at(-1).at(-1);

    return `<picture${cssClass ? ` class="${cssClass}"` : ""}>\n    ${sources}\n    <img src="${fallback.url}" width="${fallback.width}" height="${fallback.height}" alt="${alt}" loading="${loading}" decoding="async">\n  </picture>`;
  });

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
