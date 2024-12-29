export interface IPagination {
	page: number
	limit: number
	totalCount: number
	totalPages: number
}
export interface IPaginationParams {
	page?: number
	limit?: number
	searchTerm?: string
}
