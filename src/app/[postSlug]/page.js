import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";
import COMPONENT_MAP from "@/helpers/mdx-components";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  let frontmatter;
  try {
    const post = await loadBlogPost(params.postSlug);
    frontmatter = post.frontmatter;
  } catch {
    return;
  }
  return {
    title: `${frontmatter.title} · ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  let post;
  try {
    post = await loadBlogPost(params.postSlug);
  } catch {
    notFound();
  }
  if (!post) {
    notFound();
  }
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={COMPONENT_MAP} />
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
