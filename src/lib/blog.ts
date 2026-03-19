import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleMeta } from "@/components/blog/ArticleCard";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "",
        date: data.date ?? "",
        coverImage: data.coverImage ?? "",
      } as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): {
  meta: ArticleMeta;
  content: string;
} {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "",
      date: data.date ?? "",
      coverImage: data.coverImage ?? "",
    },
    content,
  };
}
