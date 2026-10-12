# Working on the Plast Netherlands website

## Atomic changes and commits

Follow the user's preferred atomic-commit guidance:
https://gitbybit.com/uk/gitopedia/best-practices/atomic-commits

- Organize work into logical, self-contained changes. Each commit should have
  one clear purpose and leave the site in a working state.
- Keep dependent templates, styles, JavaScript, content, and documentation
  together when they are needed to deliver the same change. Do not split by
  file type or create incomplete intermediate commits.
- Separate independently useful changes, such as a logo replacement, a new
  feature, an unrelated text correction, or a separate bug fix.
- Before committing, inspect the working tree and staged diff. Stage only the
  relevant files or hunks; preserve unrelated user changes.
- Use commit messages that describe the resulting behavior or purpose.
- Validate each logical change appropriately. Build with Jekyll when changing
  templates or layout; check affected links and interactions. Check desktop
  and mobile layouts when browser access permits, and report verification limits.
- Commit and push when requested or otherwise authorized by the user. Do not
  rewrite published commits, amend shared history, or force-push unless explicitly
  requested.

## Branches and pull requests

- Keep main ready to publish: the existing GitHub Pages workflow deploys main.
- Start new task branches from updated main. Use descriptive names such as
  design/homepage, content/about-us, feature/events, or fix/mobile-menu.
- Use one pull request per coherent task; it may contain several atomic commits.
- Squash when the PR represents one logical change or includes temporary fixup
  commits. Preserve separate useful atomic changes when choosing a merge method;
  do not automatically squash unrelated changes together.
- Include the concrete changes, validation performed, and remaining limitations
  in the PR description.
- Keep printable guides and other non-site artifacts out of unrelated website
  commits.

## Existing design preferences

- Preserve the Ukrainian content and the Plast emblem on the circular Dutch flag.
- Keep the design simple, with green accents and accessible, responsive navigation.
- The logo is 96px on desktop and 64px below the 992px navigation breakpoint.
