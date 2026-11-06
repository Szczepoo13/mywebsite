import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

export interface ProjectGroup {
	kind: "paper" | "competition" | "personal";
	title: string;
	/** Where the paper can be read (research groups only). */
	url?: string;
	projects: Project[];
}

// Within a group, an explicit `order` wins; projects without one keep their
// relative (date-sorted) position after the ordered ones.
const byOrder = (a: Project, b: Project) => {
	if (a.data.order != null && b.data.order != null) return a.data.order - b.data.order;
	if (a.data.order != null) return -1;
	if (b.data.order != null) return 1;
	return 0;
};

/**
 * Projects grouped the way the projects page shows them: one group per
 * research paper, then hackathons & competitions, then personal projects.
 */
export async function getProjectGroups(): Promise<ProjectGroup[]> {
	const projects = (await getCollection("projects")).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);

	const papers = new Map<string, { url?: string; projects: Project[] }>();
	for (const project of projects) {
		const paper = project.data.researchPaper;
		if (!paper) continue;
		const group = papers.get(paper) ?? { url: project.data.researchPaperUrl, projects: [] };
		group.projects.push(project);
		papers.set(paper, group);
	}

	const groups: ProjectGroup[] = [
		...[...papers.entries()].map(([title, group]) => ({
			kind: "paper" as const,
			title,
			url: group.url,
			projects: group.projects.sort(byOrder),
		})),
		{
			kind: "competition",
			title: "Hackathons & competitions",
			projects: projects
				.filter((p) => !p.data.researchPaper && p.data.competition)
				.sort(byOrder),
		},
		{
			kind: "personal",
			title: "Personal projects",
			projects: projects
				.filter((p) => !p.data.researchPaper && !p.data.competition)
				.sort(byOrder),
		},
	];
	return groups.filter((group) => group.projects.length > 0);
}

/** All projects in page order, for previous / next navigation. */
export async function getOrderedProjects(): Promise<Project[]> {
	return (await getProjectGroups()).flatMap((group) => group.projects);
}

/** One line saying where a project comes from, for headers and previews. */
export function projectContext(project: Project): string {
	if (project.data.researchPaper) return `Research paper: ${project.data.researchPaper}`;
	if (project.data.competition) return project.data.competition;
	return "Personal project";
}
