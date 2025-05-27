---
title: Välkommen till brf Urbilden
layout: layouts/home.html
---

<section>
<h2>Mest visade</h2>

<ul class="featured">
{% for item in collections.featured %}
  <li>
    <a href="{{ item.url }}">{{ item.data.eleventyNavigation.key }}</a>
  </li>
{% endfor %}
</ul>
</section>

<section class="stack with-sidebar">
  <div class="stack">
    <h2>Välkomna till brf Urbilden!</h2>

    <p>Bostadsrättsföreningen Urbilden består av två charmiga fastigheter som är byggda i slutet av 30-talet i norra Sofielund. Här hittar du en underbar innergård med lummigt gröna ytor -- vår egen oas mitt i staden.</p>

    <p>Föreningen bildades 1936 och de två fastigheterna, med beteckningen Urbilden 7, stod klara 1937.</p>
  </div>

  <img src="/assets/images/sommar-e1666778280390.jpg" alt="Uteplats på innergården">
</section>

<section class="stack">
  {% include "partials/nyhetsbrev.html" %}
</section>
