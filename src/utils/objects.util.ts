import * as _ from 'lodash'

export function omitDeep(
  obj: { [key: string]: any },
  omitKeys: string[],
): { [key: string]: any } {
  _.forIn(obj, (value, key) => {
    if (_.isPlainObject(value)) {
      omitDeep(obj, omitKeys)
    }
    if (omitKeys.includes(key)) {
      obj = _.omit(obj, omitKeys)
    }
  })

  return obj
}
