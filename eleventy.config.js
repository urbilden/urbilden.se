import { IdAttributePlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import mdIt from "./config/markdown.js"
import fs from "node:fs";

import path from "node:path";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/_includes/components/*")
  eleventyConfig.addPassthroughCopy("src/assets/**/*")
  eleventyConfig.addPassthroughCopy("src/styles.css")
  eleventyConfig.addPassthroughCopy("src/annual_reports")
  eleventyConfig.addPassthroughCopy("pretty-atom-feed.xsl")

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  // Collections
  eleventyConfig.addCollection("reports", (collection) => {
    return collection.getFilteredByGlob('./src/annual_reports/*.pdf')
  })
  
  // Filters
  // eleventyConfig.addFilter('printFileContents', function(filePath) {
  //   const relativeFilePath = "." + filePath;
  //   console.log(relativeFilePath);
  //   const fileContents = fs.readFileSync(relativeFilePath, (err, data) => {
  //     if (err) throw err;
  //     return data;
  //   });

  //   return fileContents.toString('utf8')
  // })

  eleventyConfig.addFilter('printFileSize', function(filePath) {
    const fileStats = fs.statSync(filePath, (err, data) => {
      if (err) throw err;
      return data;
    });

    const fileSize = fileStats.size;

    return fileSize.toString('utf8')
  });

  // Create RSS feed for newsletter
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    stylesheet: "pretty-atom-feed.xsl",
    // templateData: {
    //   eleventyNavigation: {
    //     key: "Feed",
    //     order: 4
    //   }
    // },
    collection : {
      name: "newsletter",
      limit: 12,
    },
    metadata: {
      language: "sv",
      title: "Brf Urbildens nyhetsbrev",
      subtitle: "Lite information om vad som pågår i föreningen just nu.",
      base: "https://urbilden.se/",
      author: {
        name: "Styrelsen i brf Urbilden",
        email: "info@urbilden.se",
      }
    }
  });


  eleventyConfig.setLibrary("md", mdIt);

  // Build Pagefind index
  // https://permortensen.com/adding-pagefind-to-an-eleventy-site/
  eleventyConfig.on('eleventy.after', async function({ dir }) {
    const inputPath = dir.output;
    const outputPath = path.join(dir.output, "pagefind");

    console.log("Creating Pagefind index of %s", inputPath);

    const pagefind = await import("pagefind");
    const { index } = await pagefind.createIndex();
    const { page_count } = await index.addDirectory({ path: inputPath });
    await index.writeFiles({ outputPath });

    console.log("Created Pagefind index of %i pages in %s", page_count, outputPath);
  });

  // Shortcodes
  eleventyConfig.addPairedShortcode(
    "info",
    (content) => {
      content = mdIt.renderInline(content);
      return `<div class="info-box role="note" aria-label"Information"><p>${content}</p></div>`;
    }
  );

  eleventyConfig.addPairedShortcode(
    "cta",
    (content, href) => {
      return `<a class="button" href="${href}">${content}</a>`;
    }
  );
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",

  dir: {
    input: "src",
    // includes: "../_includes",
    // data: "../_data",
  },
}
