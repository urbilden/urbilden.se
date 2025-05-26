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

## Välkomna till brf Urbilden!

Bostadsrättsföreningen Urbilden består av två charmiga fastigheter som är byggda i slutet av 30-talet i norra Sofielund. Här hittar du en underbar innergård med lummigt gröna ytor – vår egen oas mitt i staden.

Föreningen bildades 1936 och de två fastigheterna, med beteckningen Urbilden 7, stod klara 1937.

![Uteplats på innergården](/assets/images/Uteplats.brfUrbilden-e1548797532887.jpg)

{% include "partials/nyhetsbrev.html" %}
