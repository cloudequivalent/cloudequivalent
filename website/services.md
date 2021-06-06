---
pagination:
  data: generated.services
  size: 1
  alias: service
permalink: "{{ service.provider.key | slug }}/{{ service.slug }}/"
layout: layouts/base.njk
eleventyComputed:
  title: "{{ service.name }}"
---

{% if service.equivalents.length > 0 %}
  ## Equivalents

  {% for equivalent in service.equivalents %}
- {{ equivalent }}
  {% endfor %}
{% else %}
  We don't have any equivalents.
{% endif %}
