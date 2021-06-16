# Contributing to cloudequivalent

## Adding a new provider

To add a new provider:

- create a `meta.json` file in `data/${key}`, e.g. `data/alibaba-cloud/meta.json`
  - ensure you provide:
    - `name` (provider name)
    - `key` (reference key, e.g. `aws` or `alibaba-cloud`)
    - `accentColour` (brand colour)
    - `extra` information, such as:
      - `remote`
        - `url` for product listings
        - `bodySelector` to fetch products
        - `nameSelector` to get product names
        - `descriptionSelector` to get product descriptions
- update `scripts/utilities.js` to add the new provider key

The `services.json` file for providers are automatically generated, so don't add one into your pull request.

View the [reference pull request](https://github.com/cloudequivalent/cloudequivalent/pull/44/files) for more detail.
