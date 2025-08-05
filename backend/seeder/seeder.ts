import { seeder } from '@/utils/seeder/seeder'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

seeder(prisma, true)
	.catch(e => {
		console.error('Ошибка при заполнении базы данных:', e)
		process.exit(1)
	})
	.then(() => {
		console.log('Заполнение базы данных завершено успешно.')
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
