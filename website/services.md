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
