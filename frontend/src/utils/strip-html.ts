export const stripHtml = (html: string): string => html.replace(/<\/?[^>]+(>|$)/g, '')

export const stripHtmlWithBreak = (html: string): string =>
	html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<\/div>/gi, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.trim()
