---
pagination:
  data: generated.providers
  size: 1
  alias: provider
permalink: "{{ provider.key | slug }}/"
layout: layouts/base.njk
eleventyComputed:
  title: "{{provider.name}}"
---

{{ provider.name }}

## Services

{% for service in services %}
  {% if service.provider.key == provider.key %}
[{{ service.name }}]({{service.slug}})
  {% endif %}
{% endfor %}
