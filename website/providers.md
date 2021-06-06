---
pagination:
  data: generated.providers
  size: 1
  alias: provider
  addAllPagesToCollections: true
permalink: "{{ provider.key | slug }}/"
layout: layouts/base.njk
eleventyComputed:
  title: "{{provider.name}}"
---

## Services

{% for service in generated.services %}
  {% if service.provider.key == provider.key %}
[{{ service.name }}]({{service.slug}})
  {% endif %}
{% endfor %}
