import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowRight, ArrowLeft, Camera, BookOpen } from 'lucide-react';
import { Spinner } from '@/components/Components';
import { SECTIONS } from '@/config/content.config';

/* ============================================================
   CANOPY — Config-driven content pages.
   Markdown lives in /content/<folder>/<slug>.md, the index of
   published items lives in /registry.json, and the sections +
   navbar live in /src/config/content.config.js.
   ============================================================ */

const UI_FONT = "'Archivo Narrow', sans-serif";

/* ---------------- Content index (registry) ---------------- */
let registryCache = null;

export function useRegistry() {
  const [registry, setRegistry] = useState(registryCache);
  const [loading, setLoading] = useState(!registryCache);

  useEffect(() => {
    if (registryCache) return;
    fetch('/registry.json')
      .then(r => r.json())
      .then(data => {
        registryCache = data;
        setRegistry(data);
        setLoading(false);
      });
  }, []);

  return { registry, loading };
}

async function fetchMarkdown(folder, slug) {
  const res = await fetch(`/content/${folder}/${slug}.md`);
  if (!res.ok) return null;
  return res.text();
}

/* ---------------- Frontmatter parser (optional) ---------------- */
// Markdown files MAY start with a YAML frontmatter block:
//   ---
//   title: My Article
//   description: ...
//   date: 2026-07-04
//   readTime: 5 min read
//   image: https://...
//   ---
// If present, it overrides the registry entry for the article view.
function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: md };
  const raw = match[1];
  const body = md.slice(match[0].length);
  const meta = {};
  raw.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
  return { meta, body };
}

/* ---------------- Shared markdown renderer ---------------- */
const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight mb-6" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[1.8rem] font-extrabold tracking-tight mt-12 mb-4" style={{ fontFamily: UI_FONT, lineHeight: 1.2 }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[1.4rem] font-extrabold mt-8 mb-3" style={{ fontFamily: UI_FONT }}>{children}</h3>
  ),
  p: ({ children }) => <p className="text-[#4A4D4A] text-lg leading-[1.8] mb-6">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-[#2E7D32] bg-[#E8F5E9] px-6 py-4 my-8 rounded-r-xl italic">{children}</blockquote>
  ),
  ul: ({ children }) => <ul className="pl-6 mb-6 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="pl-6 mb-6 space-y-2 list-decimal">{children}</ol>,
  li: ({ children }) => <li className="text-[#4A4D4A] text-lg leading-relaxed">{children}</li>,
  hr: () => <hr className="border-0 border-t border-white/30 my-12" />,
  em: ({ children }) => <em className="text-[#4A4D4A]">{children}</em>,
  strong: ({ children }) => <strong className="text-[#1A1C1A] font-semibold">{children}</strong>,
  a: ({ href, children }) => <a href={href} className="text-[#2E7D32] underline underline-offset-[3px]">{children}</a>,
  img: ({ src, alt }) => <img src={src} alt={alt || ''} className="rounded-xl my-8 shadow-lg" />,
};

/* ---------------- Images ---------------- */
const HERO_IMG = 'https://media.base44.com/images/public/6a461c9d99251a01f4848a69/7096c5daa_generated_f48b17b6.png';
const FOREST_PATH_IMG = 'https://media.base44.com/images/public/6a461c9d99251a01f4848a69/67fcfcf6b_generated_dc629dbe.png';
const ABOUT_IMG = FOREST_PATH_IMG;

/* ---------------- Section not-found helper ---------------- */
function SectionNotFound() {
  return (
    <div className="pt-32 pb-16 px-[8vw] max-w-[800px] mx-auto text-center">
      <h1 className="text-3xl font-extrabold mb-4" style={{ fontFamily: UI_FONT }}>Section not found</h1>
      <p className="text-[#4A4D4A] mb-6">This content section doesn't exist.</p>
      <Link to="/" className="text-[#2E7D32] font-semibold">← Back home</Link>
    </div>
  );
}

/* ---------------- Home ---------------- */
export function Home() {
  return (
    <div>
      <section className="min-h-screen flex items-center px-[8vw] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFCFB] via-[#E8F5E9] to-[#FBFCFB] z-0" />
        <div className="relative z-10 max-w-[700px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#2E7D32] mb-6 flex items-center gap-3" style={{ fontFamily: UI_FONT }}>
              <span className="w-8 h-[2px] bg-[#2E7D32]" />
              Nature's Digital Sanctuary
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: UI_FONT, letterSpacing: '-0.04em' }}>
              Discover the <span className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">Wild Beauty</span> of Our World
            </h1>
            <p className="text-lg md:text-xl text-[#4A4D4A] mb-10 max-w-[520px] leading-relaxed">
              Immerse yourself in breathtaking galleries, botanical stories, and nature education — a sanctuary for those who find peace in the outdoors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: UI_FONT, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', boxShadow: '0 4px 16px rgba(46,125,50,0.3)' }}>
                <Camera size={18} /> Explore Gallery
              </Link>
              <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#2E7D32] font-bold text-base border-2 border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-all" style={{ fontFamily: UI_FONT }}>
                <BookOpen size={18} /> Read the Blog
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] max-w-[700px] z-[1] hidden lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <img src={HERO_IMG} alt="Ancient forest canopy at golden hour with sunlight filtering through mist" className="w-full h-[600px] object-cover shadow-lg" style={{ borderRadius: '20px 0 0 20px' }} />
        </motion.div>
      </section>

      <section className="px-[8vw] py-24 max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight mb-4" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>What Awaits You</h2>
          <p className="text-lg text-[#4A4D4A] max-w-[500px]">A curated collection of nature's finest moments, stories, and knowledge.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Photo Gallery', desc: 'Stunning imagery spanning forests, oceans, deserts, and waterfalls — organized in an immersive masonry layout.', link: '/gallery', icon: '📷' },
            { title: 'Flower Blog', desc: "Deep dives into the history, beauty, and cultural significance of the world's most beloved flowers.", link: '/blog', icon: '🌸' },
            { title: 'Nature Literacy', desc: 'Educational articles about ecosystems, conservation, and the science of the natural world.', link: '/literacy', icon: '🌿' },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link to={card.link} className="block p-8 rounded-[20px] bg-white/70 border border-white/30 backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group" style={{ boxShadow: '0 4px 24px rgba(46,125,50,0.08)' }}>
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-xl font-extrabold mb-3 group-hover:text-[#2E7D32] transition-colors" style={{ fontFamily: UI_FONT }}>{card.title}</h3>
                <p className="text-[#4A4D4A] text-base leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#2E7D32]" style={{ fontFamily: UI_FONT }}>
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-[8vw] py-24">
        <div className="max-w-[1400px] mx-auto relative rounded-[24px] overflow-hidden">
          <img src={FOREST_PATH_IMG} alt="Redwood forest path with light filtering through the canopy" className="w-full h-[400px] md:h-[500px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C1A]/80 to-transparent flex items-center px-12 md:px-20">
            <div className="max-w-lg">
              <h2 className="text-white text-[clamp(1.8rem,3.5vw,3.5rem)] font-extrabold tracking-tight mb-4 leading-tight" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>Step Into the Forest</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">Nature doesn't hurry, yet everything is accomplished. Begin your journey through the wild.</p>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: UI_FONT, background: 'linear-gradient(135deg, #2E7D32, #4CAF50)' }}>
                Learn About Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Section list (articles + gallery) ---------------- */
export function SectionList() {
  const { section: sectionSlug } = useParams();
  const { registry, loading } = useRegistry();
  const [filter, setFilter] = useState('All');
  const [sectionContent, setSectionContent] = useState(null);
  const [sectionContentLoading, setSectionContentLoading] = useState(false);

  if (loading) return <Spinner />;

  const section = SECTIONS.find(s => s.slug === sectionSlug);
  if (!section) return <SectionNotFound />;

  useEffect(() => {
    let ignore = false;
    const contentFile = section.contentFile || 'index.md';
    const filePath = `/content/${section.folder}/${contentFile}`;

    setSectionContentLoading(true);
    fetch(filePath)
      .then((res) => {
        if (!res.ok) return null;
        return res.text();
      })
      .then((text) => {
        if (ignore) return;
        setSectionContent(text ? parseFrontmatter(text) : null);
        setSectionContentLoading(false);
      })
      .catch(() => {
        if (!ignore) {
          setSectionContent(null);
          setSectionContentLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [section.folder, section.contentFile]);

  const items = registry?.[section.slug] || [];

  /* ----- Gallery ----- */
  if (section.type === 'gallery') {
    const filtered = filter === 'All' ? items : items.filter(g => g.category === filter);
    return (
      <div className="pt-28 pb-16 px-[8vw] max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <h1 className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight mb-4" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>{section.navLabel}</h1>
          <p className="text-lg text-[#4A4D4A] max-w-[550px]">{section.description}</p>
        </motion.div>

        {!sectionContentLoading && sectionContent && (
          <div className="mb-10 rounded-[24px] border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            {sectionContent.meta.title && (
              <h2 className="text-2xl font-extrabold mb-3" style={{ fontFamily: UI_FONT }}>{sectionContent.meta.title}</h2>
            )}
            {sectionContent.meta.description && (
              <p className="text-[#4A4D4A] text-lg mb-6">{sectionContent.meta.description}</p>
            )}
            <div className="prose max-w-none">
              <ReactMarkdown components={mdComponents}>{sectionContent.body}</ReactMarkdown>
            </div>
          </div>
        )}

        {!sectionContentLoading && sectionContent && (
          <div className="mb-10 rounded-[24px] border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            {sectionContent.meta.title && (
              <h2 className="text-2xl font-extrabold mb-3" style={{ fontFamily: UI_FONT }}>{sectionContent.meta.title}</h2>
            )}
            {sectionContent.meta.description && (
              <p className="text-[#4A4D4A] text-lg mb-6">{sectionContent.meta.description}</p>
            )}
            <div className="prose max-w-none">
              <ReactMarkdown components={mdComponents}>{sectionContent.body}</ReactMarkdown>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {section.categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
                filter === cat ? 'border-[#2E7D32] text-[#2E7D32] bg-[#E8F5E9]' : 'border-white/30 text-[#4A4D4A] bg-white/70 hover:border-[#2E7D32] hover:text-[#2E7D32]'
              }`}
              style={{ fontFamily: UI_FONT }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="break-inside-avoid mb-6 rounded-[20px] overflow-hidden bg-white/70 border border-white/30 backdrop-blur-xl cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ boxShadow: '0 4px 24px rgba(46,125,50,0.08)' }}
            >
              <div className="overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full block transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="px-5 py-4">
                <h4 className="text-base font-extrabold mb-1" style={{ fontFamily: UI_FONT }}>{item.title}</h4>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]/70" style={{ fontFamily: UI_FONT }}>{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: UI_FONT }}>No photos in this category yet</h3>
            <p className="text-[#4A4D4A]">Check back soon for new additions.</p>
          </div>
        )}
      </div>
    );
  }

  /* ----- Articles: feature list (blog) ----- */
  if (section.listStyle === 'feature') {
    return (
      <div className="pt-28 pb-16 px-[8vw] max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <h1 className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight mb-4" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>{section.navLabel}</h1>
          <p className="text-lg text-[#4A4D4A] max-w-[600px]">{section.description}</p>
        </motion.div>

        <div className="grid gap-8">
          {items.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Link to={`/${section.slug}/${post.slug}`} className="grid md:grid-cols-[280px_1fr] rounded-[20px] overflow-hidden bg-white/70 border border-white/30 backdrop-blur-xl group transition-all hover:-translate-y-1 hover:shadow-xl relative" style={{ boxShadow: '0 4px 24px rgba(46,125,50,0.08)' }}>
                <div className="overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover min-h-[220px] transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 md:px-10 flex flex-col justify-center">
                  <div className="flex gap-6 text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-3" style={{ fontFamily: UI_FONT }}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3 group-hover:text-[#2E7D32] transition-colors" style={{ fontFamily: UI_FONT }}>{post.title}</h3>
                  <p className="text-[#4A4D4A] text-base leading-relaxed">{post.description}</p>
                </div>
                <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-[#4CAF50] rotate-45 opacity-0 group-hover:opacity-60 group-hover:bottom-5 group-hover:right-5 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: UI_FONT }}>No posts yet</h3>
            <p className="text-[#4A4D4A]">Add a markdown file to /content/{section.folder}/ and an entry to registry.json to get started.</p>
          </div>
        )}
      </div>
    );
  }

  /* ----- Articles: icon grid (literacy) ----- */
  return (
    <div className="pt-28 pb-16 px-[8vw] max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight mb-4" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>{section.navLabel}</h1>
        <p className="text-lg text-[#4A4D4A] max-w-[600px]">{section.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((article, i) => (
          <motion.div key={article.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
            <Link to={`/${section.slug}/${article.slug}`} className="block p-8 rounded-[20px] bg-white/70 border border-white/30 backdrop-blur-xl group transition-all hover:-translate-y-1 hover:shadow-xl h-full" style={{ boxShadow: '0 4px 24px rgba(46,125,50,0.08)' }}>
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#E8F5E9] to-[rgba(129,199,132,0.3)] flex items-center justify-center text-2xl mb-6">{article.icon}</div>
              <h3 className="text-xl font-extrabold mb-3 group-hover:text-[#2E7D32] transition-colors" style={{ fontFamily: UI_FONT }}>{article.title}</h3>
              <p className="text-[#4A4D4A] text-base leading-relaxed mb-6">{article.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-[#2E7D32]" style={{ fontFamily: UI_FONT }}>
                Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: UI_FONT }}>No articles yet</h3>
          <p className="text-[#4A4D4A]">Add a markdown file to /content/{section.folder}/ and an entry to registry.json to get started.</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Article view (any articles section) ---------------- */
export function SectionArticle() {
  const { section: sectionSlug, slug } = useParams();
  const { registry, loading: regLoading } = useRegistry();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const section = SECTIONS.find(s => s.slug === sectionSlug);
  const regMeta = registry?.[sectionSlug]?.find(p => p.slug === slug);

  useEffect(() => {
    if (!slug || !section) return;
    setLoading(true);
    fetchMarkdown(section.folder, slug).then(md => {
      setContent(md);
      setLoading(false);
    });
  }, [slug, section]);

  if (regLoading || loading) return <Spinner />;

  if (!section || !content) {
    return (
      <div className="pt-28 pb-16 px-[8vw] max-w-[800px] mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: UI_FONT }}>Article not found</h2>
        <Link to={`/${section ? section.slug : ''}`} className="text-[#2E7D32] font-semibold">← Back</Link>
      </div>
    );
  }

  const { meta: fm, body } = parseFrontmatter(content);
  const meta = { ...regMeta, ...fm };

  return (
    <motion.article className="pt-28 pb-16 px-6 max-w-[800px] mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link to={`/${section.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D32] mb-8 hover:gap-3 transition-all" style={{ fontFamily: UI_FONT }}>
        <ArrowLeft size={16} /> Back to {section.navLabel}
      </Link>

      {meta?.image && (
        <img src={meta.image} alt={meta.title} className="w-full max-h-[480px] object-cover rounded-[20px] mb-10 shadow-lg" />
      )}

      {meta?.icon && (
        <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#E8F5E9] to-[rgba(129,199,132,0.3)] flex items-center justify-center text-3xl mb-8">{meta.icon}</div>
      )}

      {meta?.date && (
        <div className="flex gap-8 text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-6" style={{ fontFamily: UI_FONT }}>
          <span>{meta.date}</span>
          {meta.readTime && <span>{meta.readTime}</span>}
        </div>
      )}

      <div className="prose-serene">
        <ReactMarkdown components={mdComponents}>{body}</ReactMarkdown>
      </div>
    </motion.article>
  );
}

/* ---------------- About ---------------- */
const ABOUT_VALUES = [
  { icon: '🌱', title: 'Preservation', desc: 'We believe in protecting the natural world for future generations through awareness and education.' },
  { icon: '📸', title: 'Appreciation', desc: 'Every photograph and story is a celebration of the beauty that surrounds us — if only we stop to look.' },
  { icon: '📖', title: 'Education', desc: 'Knowledge is the foundation of conservation. We share the science and stories of the natural world.' },
];

export function About() {
  return (
    <div className="pt-28 pb-16">
      <section className="px-[8vw] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight mb-6" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }}>About Canopy</h1>
            <p className="text-lg text-[#4A4D4A] leading-relaxed mb-5">Canopy was born from a simple belief: that the natural world deserves to be seen, understood, and protected. We created this digital sanctuary as a space where nature lovers, photographers, and the curious can come together to celebrate the extraordinary beauty of our planet.</p>
            <p className="text-lg text-[#4A4D4A] leading-relaxed mb-5">From the ancient forests that have stood for millennia to the delicate petals of a single flower, every element of nature tells a story. Our mission is to share those stories — through stunning imagery, thoughtful writing, and accessible education.</p>
            <p className="text-lg text-[#4A4D4A] leading-relaxed">We believe that when people truly see and understand nature, they are moved to protect it. Canopy is our contribution to that understanding — a place where the wild beauty of the world is always just a click away.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <img src={ABOUT_IMG} alt="Dense old-growth forest path with towering redwood trees and light filtering through the canopy" className="w-full h-[500px] object-cover rounded-[20px] shadow-lg" />
          </motion.div>
        </div>
      </section>

      <section className="px-[8vw] max-w-[1400px] mx-auto mt-24">
        <motion.h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold tracking-tight mb-10" style={{ fontFamily: UI_FONT, letterSpacing: '-0.03em' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ABOUT_VALUES.map((v, i) => (
            <motion.div key={v.title} className="text-center p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="text-5xl mb-5">{v.icon}</div>
              <h4 className="text-lg font-extrabold mb-3" style={{ fontFamily: UI_FONT }}>{v.title}</h4>
              <p className="text-[#4A4D4A] text-base leading-relaxed max-w-[300px] mx-auto">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-[8vw] max-w-[800px] mx-auto mt-24 text-center">
        <motion.blockquote className="text-2xl md:text-3xl font-extrabold italic text-[#2E7D32] leading-snug" style={{ fontFamily: UI_FONT }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          "In every walk with nature, one receives far more than he seeks."
        </motion.blockquote>
        <p className="text-sm font-semibold text-[#4A4D4A] mt-4" style={{ fontFamily: UI_FONT }}>— John Muir</p>
      </section>
    </div>
  );
}