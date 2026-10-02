# Content Input (Staging Folder)

This folder is a staging area on the `content-staging` branch only. Drop new material here first; nothing in this folder is linked from the live website yet.

- `images/` — put new photos here (gallery, hero, portraits, etc.) before they get resized/optimised and moved into `assets/images/` or uploaded through the Admin Dashboard.
- `info/` — put new text/content here (copy, pricing changes, new session details, notes, links, anything you want reflected on the site).

## Why staging first?

Keeping new material here, instead of directly editing the live pages, means:
- The live site (`main` branch) stays untouched until changes are reviewed.
- Large or unoptimised images don't go straight into `assets/` (Cloudflare Pages has a 25 MiB per-file limit, and big images slow the site down).
- Any content you drop here can be reviewed before it's wired into the HTML or uploaded to Supabase.

## What happens next

When you're ready, let your agent know what's in here and where it should go (e.g. "these 5 images are for the Couple gallery category" or "update the pricing section with this text"). It will move/optimise images into the right place and update the relevant files — then you can merge `content-staging` back into `main`.
