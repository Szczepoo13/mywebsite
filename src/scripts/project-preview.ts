// Projects page: the list on the left and the preview pane on the right stay
// in sync through the project slug.

/** Show the preview for `slug` and mark its row active. No-op elsewhere. */
export function showPreview(root: ParentNode, slug: string) {
	const previews = root.querySelectorAll<HTMLElement>("[data-preview]");
	if (!previews.length) return;
	if (![...previews].some((p) => p.dataset.project === slug)) return;
	previews.forEach((p) => (p.hidden = p.dataset.project !== slug));
	root.querySelectorAll<HTMLElement>("[data-project-link]").forEach((row) => {
		row.toggleAttribute("data-active", row.dataset.projectLink === slug);
	});
}

/**
 * The element that should carry the shared "project-hero" transition name
 * for `slug`: a home tile, the projects-page preview (wide screens), or the
 * list row (narrow screens, where the preview pane is hidden).
 */
export function morphTarget(root: ParentNode, slug: string, wide: boolean) {
	const esc = CSS.escape(slug);
	const tile = root.querySelector<HTMLElement>(`[data-project="${esc}"]:not([data-preview])`);
	if (tile) return tile;
	const preview = root.querySelector<HTMLElement>(`[data-preview][data-project="${esc}"]`);
	if (preview && wide && !preview.hidden) return preview;
	return root.querySelector<HTMLElement>(`[data-project-link="${esc}"]`);
}
