import { Module } from '@nestjs/common'
import { TagsResolver } from './tags.resolver'
import { TagsService } from './tags.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TagSchema } from './schemas/tag.schema'
import { TagsInjectString } from './tags.constant'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TagsInjectString.MODEL, schema: TagSchema },
    ]),
  ],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}
