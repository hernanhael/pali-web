import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { GoldDivider } from "@/components/ui/GoldDivider";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const { meta } = getArticleBySlug(params.slug);
    return {
      title: `${meta.title} — Dra. María Paula Cajal`,
      description: meta.excerpt,
    };
  } catch {
    return {};
  }
}

export default function ArticlePage({ params }: Props) {
  let meta, content;
  try {
    ({ meta, content } = getArticleBySlug(params.slug));
  } catch {
    notFound();
  }

  const formattedDate = new Date(meta.date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-bg pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="font-sans text-sm text-[--text-secondary] hover:text-gold transition-colors duration-200 flex items-center gap-2 mb-10"
        >
          ← Volver al blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-sans text-xs text-gold bg-gold/10 rounded-full px-2.5 py-0.5">
              {meta.category}
            </span>
            <span className="font-sans text-xs text-[--text-secondary]">{formattedDate}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl text-ink leading-tight">
            {meta.title}
          </h1>
          <p className="font-sans text-lg text-[--text-secondary] mt-4 leading-relaxed">
            {meta.excerpt}
          </p>
        </div>

        <GoldDivider className="mb-10" />

        {/* Contenido MDX */}
        <article className="prose-none">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <GoldDivider className="mt-16 mb-10" />

      </div>
    </div>
  );
}
