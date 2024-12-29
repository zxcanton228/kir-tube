// default 2mb
export const validateFileSize = (file: File, maxFileSize = 2 * 1024 * 1024) => {
	let maxSizeFormatted: string
	if (maxFileSize >= 1024 * 1024 * 1024) {
		maxSizeFormatted = (maxFileSize / (1024 * 1024 * 1024)).toFixed(0) + ' GB'
	} else {
		maxSizeFormatted = (maxFileSize / (1024 * 1024)).toFixed(1) + ' MB'
	}

	if (file.size > maxFileSize) {
		const toasterFn = async () => {
			const { toast } = await import('react-hot-toast')
			toast.error(`File is too big! (max ${maxSizeFormatted})`)
		}
		toasterFn()
		return false
	}
	return true
}
