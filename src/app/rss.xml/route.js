import RSS from "rss";
import { BLOG_TITLE, BLOG_DESCRIPTION, AUTHOR } from "@/constants.js";
import { getBlogPostList } from "@/helpers/file-helpers.js";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const domain = headersList.get("host");
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site_url: `https://www.${domain}/`,
    feed_url: `https://www.${domain}/rss.xml`,
  });
  const posts = await getBlogPostList();
  posts.forEach(({ slug, title, abstract, publishedOn }) =>
    feed.item({
      title,
      description: abstract,
      url: `https://www.${domain}/${slug}/`,
      guid: `https://www.${domain}/${slug}/`,
      author: AUTHOR,
      date: publishedOn,
    })
  );
  const xml = feed.xml({ indent: true });

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
