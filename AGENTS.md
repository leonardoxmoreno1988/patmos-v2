<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The PATMOS wordmark lives in `src/components/brand/patmos-wordmark.tsx` and is the single source for every brand logo (site header, Consultas Patmos panel). Add new brand placements by importing it there — never inline the SVG or a second copy, so dark-mode inversion stays consistent. Why: one asset pointer, one filter rule, no drift between surfaces.
