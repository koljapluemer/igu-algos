# How to Build Documentation

We have doc strings, and we have manually written markdown documentation.

### DocStrings

- As you can see in [How to Inline-Document](./how-to-inline-document.md), code is documented with docstrings following a minimal JSDoc spec
- This documentation is pulled together as markdown files into `docs/reference` by `typedoc`
- This process happens when we run `npm run doc`

### Manual MD

- We also have development documentation such as this, as wall as explanations, tutorials, and how-tos (following [diataxis](https://diataxis.fr/) paradigm) written in plain markdown files that live in the respective `docs/` folders
- These are made into a static site by `mkdocs` (the only reason that there's python in this project)
- This build happens also when we run `npm run doc` (this requires the python setup, being in `.venv` and all that)
- We also have to push the doc to gh pages, which is done by the magic command `mkdocs gh-deploy --clean`