module.exports = {
  isProd: process.env.ELEVENTY_ENV === "production",
  isDev: process.env.ELEVENTY_ENV !== "production",
};
