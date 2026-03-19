"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { scaleIn, viewportConfig } from "@/lib/animations";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  coverImage?: string;
}

interface ArticleCardProps {
  article: ArticleMeta;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <Link href={`/blog/${article.slug}`} className="block group">
        {/* Cover */}
        <div className="relative aspect-[16/9] rounded-2xl bg-gradient-to-br from-blue-soft/20 to-warm/30 flex items-center justify-center mb-4 overflow-hidden">
          {article.coverImage ? (
            <CldImage
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className="font-sans text-sm text-blue-mid/40">
              {article.title}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-xs text-gold bg-gold/10 rounded-full px-2.5 py-0.5">
            {article.category}
          </span>
          <span className="font-sans text-xs text-[--text-secondary]">{formattedDate}</span>
        </div>

        <h2 className="font-heading text-xl text-ink leading-snug group-hover:text-blue-mid transition-colors duration-300 mb-2">
          {article.title}
        </h2>

        <p className="font-sans text-sm text-[--text-secondary] leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        <span className="font-sans text-xs text-gold mt-3 inline-block group-hover:underline">
          Leer más →
        </span>
      </Link>
    </motion.article>
  );
}
