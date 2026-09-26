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
- The QueryClient is never dehydrated/hydrated, so any query a route `loader` resolved server-side MUST be seeded client-side (`initialData: Route.useLoaderData()`) before it is rendered. Why: an unseeded query hydrates empty while the server HTML already has content, and the resulting hydration mismatch makes React regenerate the tree and blank the page.
- `/api/chat` must never answer a 5xx for expected states: unauthenticated → 401 JSON, model credentials missing → 200 plain-text notice. Why: the panel's fetch path renders either as a normal reply or a login prompt; a 5xx trips the route error boundary and blanks the reader.
- Home and reader share the Consultas Patmos panel; home starts in Bible-wide mode, while reader can attach its active chapter. Why: the free-exegesis entry must not silently send a passage, and history should open the same saved-session view.
- Home grid percentages show global study-notes coverage (unique chapters with notes per book from the Google Sheet CSV via `studyNotesQuery`), NOT personal reading progress. Local reading progress (`reading-progress.ts`) only feeds "Continuar Lectura". Why: the bars communicate editorial availability of notes, not user activity.
