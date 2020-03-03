import { Injectable, HttpStatus } from '@nestjs/common'
import {
  RegisterInput,
  User,
  UserStatus,
  GetAllUsersInput,
} from 'src/graphql.schema'
import { Model, Document } from 'mongoose'
import { GeneralError } from 'src/common/general-error'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User & Document>,
  ) {}
  async getAll(args: GetAllUsersInput): Promise<User[]> {
    try {
      return this.userModel.find(args)
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async getById(id: string): Promise<User> {
    try {
      return this.userModel.findById(id)
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async getBy(queryObject: object): Promise<User> {
    try {
      return this.userModel.findOne(queryObject)
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async checkUserExists(queryObject: object): Promise<void> {
    const existedUser = await this.getBy(queryObject)
    if (existedUser) {
      throw new GeneralError({
        isPublic: true,
        message: `User with email: ${existedUser.email} is existed`,
        status: HttpStatus.BAD_REQUEST,
      })
    }
  }

  async register(args: RegisterInput): Promise<User> {
    try {
      const createdUser = new this.userModel(args)
      return createdUser.save()
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async updateById(id: string, updateData: any): Promise<User> {
    try {
      return this.userModel.findByIdAndUpdate(id, updateData, { new: true })
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async deleteById(id: string): Promise<User> {
    try {
      return this.userModel.findByIdAndUpdate(id, {
        status: UserStatus.Deactivate,
      })
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
