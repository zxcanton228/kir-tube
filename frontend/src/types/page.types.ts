export interface IPageProps<T> {
	params: T
}
export type TPageSlugProps = IPageProps<{ slug: string }>
export type TPageIdProps = IPageProps<{ id: string }>
