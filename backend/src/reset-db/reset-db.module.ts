import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ResetDbController } from './reset-db.controller'
import { ResetDbService } from './reset-db.service'

@Module({
	controllers: [ResetDbController],
	providers: [ResetDbService, PrismaService],
	imports: [ScheduleModule.forRoot()]
})
export class ResetDbModule {}
