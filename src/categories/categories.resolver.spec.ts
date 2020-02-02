import { Test } from '@nestjs/testing'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'

const mockCategoriesService = () => ({
  getAll: jest.fn(),
  create: jest.fn(),
})

describe('CategoriesResolver', () => {
  let categoriesResolver
  let categoriesService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: CategoriesService, useFactory: mockCategoriesService },
        CategoriesResolver,
      ],
    }).compile()

    categoriesService = module.get<CategoriesService>(CategoriesService)
    categoriesResolver = module.get<CategoriesResolver>(CategoriesResolver)
  })

  describe('getAll', () => {
    it('should call categoriesService.getAll and return an array of categories', async () => {
      await categoriesResolver.getAll()

      expect(categoriesService.getAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should call categoriesService.create and return createdCategory', async () => {
      const mockInput = {
        title: 'mock title',
        level: 1,
        priority: 1,
      }
      await categoriesResolver.create(mockInput)

      expect(categoriesService.create).toHaveBeenCalledWith(mockInput)
    })
  })
})
