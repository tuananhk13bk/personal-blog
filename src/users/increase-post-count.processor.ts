import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { UsersService } from './users.service'
import { UserQueue } from 'src/common/constants/queues.constant'
import { Logger } from 'winston'
import { Inject } from '@nestjs/common'
import { APP_LOGGER } from 'src/common/constants/providers.constant'

@Processor(UserQueue.NAME)
export class IncreaseUserPostCountConsumer {
  constructor(
    private readonly userService: UsersService,
    @Inject(APP_LOGGER) private readonly logger: Logger,
  ) {}
  @Process(UserQueue.ACTION.INCREASE_POST_COUNT)
  async transcode(job: Job) {
    const userId = job.data.userId
    const user = await this.userService.updateById(userId, {
      $inc: { postCount: 1 },
    })
    this.logger.info('ahihihhih queue job done')
    await job.moveToCompleted()
  }
}
