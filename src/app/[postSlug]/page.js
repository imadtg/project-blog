import React from "react";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  return {
    title: `${frontmatter.title} · ${BLOG_TITLE}`,
    description: frontmatter.abstract,
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
        <MDXRemote
          source={post.content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo }}
        />
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
