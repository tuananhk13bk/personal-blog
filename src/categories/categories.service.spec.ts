import { Test } from '@nestjs/testing'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { CategorySchema } from './schemas/category.schema'
import MongooseConfigService from 'src/config/mongo.config'
import { CategoriesModule } from './categories.module'
import { Category, CreateCategoryInput } from 'src/graphql.schema'
import { Model } from 'mongoose'

const mockCategoriesService = () => ({
  getAll: jest.fn(),
  create: jest.fn(),
})

const mockCategoryModel = {
  find: jest.fn(),
  save: jest.fn(),
}

describe('CategoriesService', () => {
  // let categoriesResolver
  let categoriesService: CategoriesService
  let categoryModel

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        // { provide: CategoriesService, useFactory: mockCategoriesService },
        // CategoriesResolver,
        CategoriesService,
        { provide: getModelToken('Category'), useValue: mockCategoryModel },
      ],
    }).compile()

    categoriesService = module.get<CategoriesService>(CategoriesService)
    // categoryModel = module.get(getModelToken('Cateogry'))
    // categoriesResolver = module.get<CategoriesResolver>(CategoriesResolver)
  })

  describe('getAll', () => {
    it('should call categoriesService.getAll and return an array of categories', async () => {
      // const mock = []
      // jest.spyOn(categoriesService, 'getAll').mockReturnValue(mock)
      // categoriesService.getAll.mockReturnValue(mock)

      // categoriesResolver.getAll()

      // expect(categoriesService.getAll).toHaveBeenCalledTimes(1)
      // expect(result).toEqual(mock)
      await categoriesService.getAll()
      expect(mockCategoryModel.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should call categoriesService.create and return createdCategory', async () => {
      const mockInput: CreateCategoryInput = {
        title: 'mock title',
        level: 1,
        priority: 1,
      }
      const mockResult: Category = {
        ...mockInput,
        createdDate: new Date(),
      }

      await categoriesService.create(mockResult)

      expect(mockCategoryModel.save).toHaveBeenCalledWith(mockResult)
      // jest.spyOn(categoriesService, 'create').mockResolvedValue(mockResult)

      // await categoriesResolver.create(mockInput)

      // expect(categoriesService.create).toHaveBeenCalledWith(mockInput)
      // expect(result).toEqual(mockResult)
    })
  })
})
