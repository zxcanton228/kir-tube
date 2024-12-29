class StudioPage {
	public readonly HOME: string = '/studio'
	public readonly SETTINGS: string = `${this.HOME}/settings`

	public readonly UPLOAD_VIDEO: string = `${this.HOME}/upload`

	public readonly EDIT_VIDEO = (path: string): string => `${this.HOME}/edit/v/${path}`
}

export const STUDIO_PAGE = new StudioPage()
