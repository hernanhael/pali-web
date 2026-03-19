import { getAllArticles } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GoldDivider } from "@/components/ui/GoldDivider";

export const metadata = {
  title: "Blog — Dra. María Paula Cajal",
  description: "Artículos sobre salud bucal, estética dental y novedades odontológicas.",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-bg pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionTitle
          eyebrow="Blog"
          title="Salud y estética dental"
          subtitle="Artículos para que entiendas mejor tu boca y tomes mejores decisiones."
        />
        <GoldDivider />

        {articles.length === 0 ? (
          <p className="font-sans text-[--text-secondary]">Próximamente...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
