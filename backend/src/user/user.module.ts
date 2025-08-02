import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	providers: [UserService, PrismaService],
	controllers: [UserController],
	imports: [ConfigModule],
	exports: [UserService]
})
export class UserModule {}
