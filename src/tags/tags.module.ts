import { Module } from '@nestjs/common'
import { TagsResolver } from './tags.resolver'
import { TagsService } from './tags.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TagSchema } from './schemas/tag.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}
