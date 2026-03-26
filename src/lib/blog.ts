import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleMeta } from "@/components/blog/ArticleCard";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"));

  const articles = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(BLOG_DIR, filename);
      const raw = await fs.readFile(filePath, "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "",
        date: data.date ?? "",
        coverImage: data.coverImage ?? "",
      } as ArticleMeta;
    }),
  );

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getArticleBySlug(slug: string): Promise<{
  meta: ArticleMeta;
  content: string;
}> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf-8");
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
