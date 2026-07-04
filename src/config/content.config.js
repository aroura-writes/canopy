// ============================================================
//  CANOPY — Single source of truth for navbar + content sections
//  ------------------------------------------------------------
//  Each entry here becomes a navbar link AND a content section.
//  To add content (articles): drop a .md file in
//  public/content/<folder>/ and add an entry to public/registry.json
//  under the matching "slug" key. See CONTENT_GUIDE.md for the
//  full, step-by-step GitHub workflow.
// ============================================================

export const BRAND = 'Canopy';

export const SECTIONS = [
  {
    slug: 'gallery',
    navLabel: 'Gallery',
    type: 'gallery',
    folder: 'gallery',
    description: "A curated collection of nature's most breathtaking moments — from ancient forests to desert dunes.",
    categories: ['All', 'Forests', 'Oceans', 'Deserts', 'Waterfalls'],
  },
  {
    slug: 'blog',
    navLabel: 'Flower Blog',
    type: 'articles',
    listStyle: 'feature',
    folder: 'blog',
    description: "Stories of the world's most beloved flowers — their history, cultural significance, and timeless beauty.",
  },
  {
    slug: 'literacy',
    navLabel: 'Nature Literacy',
    type: 'articles',
    listStyle: 'icon',
    folder: 'literacy',
    description: 'Educational articles about ecosystems, conservation, and the science of the natural world.',
  },
];