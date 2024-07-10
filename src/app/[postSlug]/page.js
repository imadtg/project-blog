import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  return {
    title: frontmatter.title,
    description: `${frontmatter.abstract} · ${BLOG_TITLE}`,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPostList();
  return posts.map(({ slug }) => ({
    postSlug: slug,
  }));
}

export default BlogPost;
