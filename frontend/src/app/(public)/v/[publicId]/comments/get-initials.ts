const getInitials = (fullName: string): string => {
	if (!fullName) return 'NN'
	const [firstName, lastName] = fullName.split(' ')
	if (typeof firstName !== 'string' || typeof lastName !== 'string') return 'NN'
	return `${firstName.charAt(0)}${lastName.charAt(1)}`.toUpperCase()
}
export default getInitials
