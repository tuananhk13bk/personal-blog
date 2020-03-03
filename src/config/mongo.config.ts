import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.MONGO_URI_LOCAL,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  }
}

export default MongooseConfigService
