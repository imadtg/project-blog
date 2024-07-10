import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
};

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      <BlogPostSummaries />
    </div>
  );
}

async function BlogPostSummaries() {
  const blogPosts = await getBlogPostList();
  return blogPosts.map(({ slug, title, abstract, publishedOn }) => (
    <BlogSummaryCard
      key={slug}
      slug={slug}
      title={title}
      abstract={abstract}
      publishedOn={publishedOn}
    />
  ));
}

export default Home;
