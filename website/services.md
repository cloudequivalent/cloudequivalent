---
pagination:
  data: generated.services
  size: 1
  alias: service
  addAllPagesToCollections: true
permalink: "{{ service.provider.key | slug }}/{{ service.slug }}/"
layout: layouts/base.njk
eleventyComputed:
  title: "{{ service.name }}"
---

{% if service.equivalents.length > 0 %}
  ## Equivalents

  <table>
    <thead>
      <tr>
        <th>Cloud Provider</th>
        <th>Equivalent</th>
      </tr>
    </thead>
    <tbody>
      {%- for equivalent in service.equivalents -%}
      <tr>
        <td>{{ equivalent.provider.name }}</td>
        <td>{{ equivalent.name }}</td>
      </tr>
      {%- endfor -%}
    </tbody>
  </table>

{% else %}
  We don't have any equivalents.
{% endif %}
