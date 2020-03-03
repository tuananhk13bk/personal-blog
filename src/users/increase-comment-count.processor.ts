import { Processor, Process } from '@nestjs/bull'
import { UserQueue } from 'src/common/constants/queues.constant'
import { Job } from 'bull'
import { UsersService } from './users.service'

@Processor(UserQueue.NAME)
export class IncreaseUserCommentCountConsumer {
  constructor(private userService: UsersService) {}

  @Process(UserQueue.ACTION.INCREASE_COMMENT_COUNT)
  async transcode(job: Job) {
    const userId = job.data.userId
    const user = await this.userService.updateById(userId, {
      $inc: { commentCount: 1 },
    })

    await job.moveToCompleted()
  }
}
