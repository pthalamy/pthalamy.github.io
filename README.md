# pthalamy.github.io

Personal website of Pierre Thalamy, served by GitHub Pages at <https://pthalamy.github.io>.

## Structure

```
index.html            English home page
about.html            Personal page (warm theme via the mood-warm class on <html>)
publications.html     Papers, thesis, jury, abstracts, BibTeX
cv.html               Printable résumé (use the "Print or save as PDF" button)
fr/                   French versions of the three pages
assets/css/site.css   All styles, design tokens on :root, dark theme via data-theme or system preference
assets/js/site.js     Theme toggle, reveal animations, YouTube facade, BibTeX copy, print button
images/               Portrait (pierre.jpg / pierre.webp) and favicon
papers/               Paper PDFs (Git LFS), thumbnails and .bib files
```

There is no build step: edit the HTML or CSS and push. PDFs are stored with Git LFS, so pages link to
them through `media.githubusercontent.com`, which GitHub Pages cannot serve directly.

## Editing content

* Text that still needs Pierre's review is marked with `TODO(Pierre)` comments in the HTML.
* Keep the English and French pages in sync: `fr/*.html` mirror the root pages one to one.
* To add a paper, copy one `<article class="pub pub-full">` block in `publications.html` and its French twin,
  drop the PDF in `papers/`, a 480 px wide WebP thumbnail in `papers/thumbnails/` and the `.bib` in `papers/bib/`.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
