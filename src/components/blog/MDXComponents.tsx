import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-heading text-4xl md:text-5xl text-ink leading-tight mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-heading text-3xl text-ink leading-tight mt-10 mb-3 pb-2 border-b border-warm/40"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-heading text-2xl text-ink mt-8 mb-2" {...props} />
  ),
  p: (props) => (
    <p
      className="font-sans text-[--text-secondary] leading-relaxed mb-4"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="font-sans text-[--text-secondary] space-y-2 mb-4 pl-6 list-none" {...props} />
  ),
  li: (props) => (
    <li className="relative pl-4 before:content-['✦'] before:absolute before:left-0 before:text-gold before:text-xs" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-gold pl-6 my-6 font-heading text-xl text-ink/70 italic"
      {...props}
    />
  ),
  hr: () => <div className="gold-divider my-8" />,
  a: (props) => (
    <a className="text-gold hover:underline" {...props} />
  ),
};
