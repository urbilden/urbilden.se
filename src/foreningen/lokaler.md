---
title: Lokaler
layout: layouts/article.html
eleventyNavigation:
  key: Lokaler
  parent: Föreningen
  order: 4
--- 

I föreningen finns diverse lokaler, varav vissa är tillgängliga för alla medlemmar.

<div class="nav">
  {% set navPages = collections.all | eleventyNavigation("Lokaler") %}
  {%- for entry in navPages %}
  <div class="expand-target browse stack">
    <h3>
      <a href="{{ entry.url }}" class="test">{{ entry.title }}</a>
    </h3>
    <p>{{ entry.excerpt }}</p>
  </div>
  {%- endfor %}
</div>
