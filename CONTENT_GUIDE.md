# 🌿 Canopy — Content Guide

Everything on this site is driven by **Markdown files** + a small **content index**.
You can manage 100% of your content from GitHub — no code editing required for
articles or gallery images.

---

## How the system works

| Piece | File | What it does |
|-------|------|--------------|
| **Sections & Navbar** | `src/config/content.config.js` | Defines every navbar link + which content section it opens. |
| **Content index** | `public/registry.json` | The list of *published* items (the site can't scan folders on its own, so this is your "table of contents"). |
| **Article body** | `public/content/<section>/<slug>.md` | The actual Markdown content for each article. |

> **The navbar tag = the section `slug`.**
> A Markdown file lives in `public/content/<folder>/`, and its matching entry in
> `registry.json` sits under the same `slug` key. That `slug` is also what the
> navbar link points to. So the folder + registry key **is** the "navbar tag"
> that decides where the content shows up.

---

## ✏️ Add a new article (Blog or Nature Literacy)

Two steps, both done from GitHub's web editor:

### 1. Create the Markdown file
Add a file at `public/content/<section-folder>/<slug>.md`.

- `<section-folder>` = `blog` for Flower Blog, `literacy` for Nature Literacy.
- `<slug>` = the URL-friendly file name, e.g. `the-timeless-rose`. Use lowercase
  letters, numbers, and hyphens only.

You may start the file with an **optional frontmatter block** — the site uses it
for the article header and it overrides the registry entry:

```md
---
title: The Timeless Rose
description: A journey through centuries of the world's most beloved flower.
date: 2026-06-28
readTime: 5 min read
image: https://media.base44.com/.../your-image.png
---

# The Timeless Rose

Write your article in **Markdown** here. Headings, paragraphs, lists,
> blockquotes, **bold**, *italics*, [links](https://...), and images all work.
```

> Frontmatter is optional. If you skip it, the title/description/image come from
> `registry.json` instead (see step 2). Most people put the metadata in
> `registry.json` and keep the `.md` file as pure content.

### 2. Add the item to the index
Open `public/registry.json` and add an entry under the matching section key:

```json
{
  "blog": [
    {
      "slug": "the-timeless-rose",
      "title": "The Timeless Rose",
      "description": "A journey through centuries of the world's most beloved flower.",
      "date": "2026-06-28",
      "readTime": "5 min read",
      "image": "https://media.base44.com/.../your-image.png"
    }
  ],
  "literacy": [ ... ],
  "gallery": [ ... ]
}
```

That's it — commit the two files and the article appears under its navbar
section at `/<section>/<slug>` (e.g. `/blog/the-timeless-rose`).

---

## 🖼️ Add a gallery image

Gallery items are image-only (no Markdown body). Just add an entry to
`public/registry.json` under `"gallery"`:

```json
{
  "slug": "ancient-forest-canopy",
  "title": "Ancient Forest Canopy",
  "category": "Forests",
  "image": "https://media.base44.com/.../your-image.png"
}
```

Available categories are defined in `src/config/content.config.js` under the
`gallery` section's `categories` list (`All`, `Forests`, `Oceans`, `Deserts`,
`Waterfalls`). Add a new category there if you need one.

---

## ➕ Add a brand-new navbar section

If you want a *new* navbar link + content section (e.g. a "Journal"), you edit
one config file once, then add content as normal:

1. Open `src/config/content.config.js` and add an entry to the `SECTIONS` array:

   ```js
   {
     slug: 'journal',
     navLabel: 'Journal',
     type: 'articles',
     listStyle: 'feature',   // 'feature' = image cards, 'icon' = icon cards
     folder: 'journal',
     description: 'Field notes and reflections from the wild.',
   },
   ```

2. Create the folder `public/content/journal/` and add `.md` files there.
3. Add a `"journal": [ ... ]` key to `public/registry.json` with the article
   entries.

The navbar link and the `/journal` page are generated automatically from the
config — no routing code to touch.

### Section types
- `type: 'articles'` → a list of Markdown articles (`listStyle: 'feature'` for
  image cards like the blog, `listStyle: 'icon'` for icon cards like literacy).
- `type: 'gallery'` → an image masonry. Add `categories: [...]` for the filter
  buttons.

---

## ✍️ Markdown tips

- Use `#`, `##`, `###` for headings.
- Use `![alt](https://image-url)` to embed images (host them anywhere and paste
  the URL — e.g. upload to your Base44 media library and copy the link).
- Use `> quote` for blockquotes (they get the green accent style).
- Frontmatter fields: `title`, `description`, `date`, `readTime`, `image`
  (articles) or `icon` (literacy).

---

## 🚀 Publishing from GitHub

1. Go to your repository on GitHub.
2. Click into the folder you want (e.g. `public/content/blog/`).
3. **Add file → Create new file**, name it `<slug>.md`, paste your Markdown,
   and commit.
4. Open `public/registry.json`, click the ✏️ pencil, add your entry, and commit.
5. Your connected Base44 app syncs the changes — the new content appears on the
   site automatically.

That's the whole workflow: **one Markdown file + one registry entry = one new
piece of published content.**