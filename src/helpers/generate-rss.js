import { BLOG_TITLE, BLOG_DESCRIPTION, DOMAIN, AUTHOR } from "../constants.js";
import RSS from "rss";
import { getBlogPostList } from "./file-helpers.js";
import { writeFile } from "fs";
import path from "path";

async function generateRss() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    generator: "RSS for Node",
    site_url: DOMAIN,
    feed_url: `${DOMAIN}/rss.xml`,
  });
  const posts = await getBlogPostList();
  posts.forEach(({ slug, title, abstract, publishedOn }) =>
    feed.item({
      title,
      description: abstract,
      url: `${DOMAIN}/${slug}`,
      guid: `${DOMAIN}/${slug}`,
      author: AUTHOR,
      date: publishedOn,
    })
  );
  const xml = feed.xml({ indent: true });
  await writeFile(path.join(process.cwd(), "public/rss.xml"), xml, (err) => {
    if (err) throw err;
    console.log("rss.xml generated!");
  });
}

generateRss();
