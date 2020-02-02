import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { CategorySchema } from './schemas/category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
