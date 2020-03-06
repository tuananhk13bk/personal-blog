import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilsService {
  public buildSortParams(params: string): object {
    const [fieldName, order] = params.split('_')

    return { [fieldName]: order === 'ASC' ? 'ascending' : 'descending' }
  }
}
