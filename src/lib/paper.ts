// Human name for where a paper is published, from its URL.
const KNOWN_SITES: Record<string, string> = {
	"ieeexplore.ieee.org": "IEEE Xplore",
	"arxiv.org": "arXiv",
	"doi.org": "DOI",
	"dl.acm.org": "ACM Digital Library",
	"link.springer.com": "Springer",
	"journals.jps.jp": "JPS Journals",
};

export function paperSiteName(url: string): string {
	const host = new URL(url).hostname.replace(/^www\./, "");
	return KNOWN_SITES[host] ?? host;
}
