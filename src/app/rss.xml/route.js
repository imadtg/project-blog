import RSS from "rss";
import { BLOG_TITLE, BLOG_DESCRIPTION, DOMAIN, AUTHOR } from "@/constants.js";
import { getBlogPostList } from "@/helpers/file-helpers.js";

export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
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

  return new Response(xml, {headers: {"Content-Type": "application/xml"}});
}
