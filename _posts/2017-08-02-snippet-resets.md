---
layout: post
title: Snippet - Resets
subtitle:
categories: snippet
section: snippet
seq: 8
subseq: 2
---

* TOC
{:toc}

# 1. CSS Resets

[Eric Meyer의 reset code](http://meyerweb.com/eric/tools/css/reset/)을 커스터마이징한 Reset code.

```css
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  outline: none;
}
html { height: 101%; } /* always display scrollbars */
body { font-size: 62.5%; line-height: 1; font-family: Arial, Tahoma, Verdana, sans-serif; }

article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; }
ol, ul { list-style: none; }

blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; }
strong { font-weight: bold; }

input { outline: none; }

table { border-collapse: collapse; border-spacing: 0; }
img { border: 0; max-width: 100%; }

a { text-decoration: none; }
a:hover { text-decoration: underline; }
```
