import {
  MAX_ITEMS_PER_BUCKET,
  DEFAULT_ITEMS_PER_PAGE,
  FIRST_ORDER_OF_BUCKET,
} from './posts.constant'

interface Bucket {
  count?: number
  bucketOrder?: number
}

export class PostsHelper {
  public calculateBucketOrderByPage(
    page: number,
    itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE,
  ): number {
    if (page * itemsPerPage < MAX_ITEMS_PER_BUCKET) {
      return FIRST_ORDER_OF_BUCKET
    }
    return Math.floor((page * itemsPerPage) / MAX_ITEMS_PER_BUCKET)
  }

  public calculateTotalPagesByLastBucket(
    lastBucket: Bucket,
    itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE,
  ): number {
    if (!lastBucket) {
      return 0
    }

    const totalPosts =
      (lastBucket.bucketOrder - 1) * MAX_ITEMS_PER_BUCKET + lastBucket.count
    return Math.ceil(totalPosts / itemsPerPage)
  }

  public calculateTotalItemsByLastBucket(lastBucket: Bucket) {
    if (!lastBucket) {
      return 0
    }
    return (
      (lastBucket.bucketOrder - 1) * MAX_ITEMS_PER_BUCKET + lastBucket.count
    )
  }

  public extractDataOnPageFromBucketData(args: {
    bucket: any[]
    bucketOrder: number
    itemsPerPage: number
    page: number
  }): any[] {
    if (!args.bucket) {
      return []
    }

    const firstPageOfBucket =
      ((args.bucketOrder - 1) * MAX_ITEMS_PER_BUCKET) / args.itemsPerPage + 1

    const firstIndexOfThisPageOnBucket =
      (args.page - firstPageOfBucket) * args.itemsPerPage

    return args.bucket.slice(firstIndexOfThisPageOnBucket, args.itemsPerPage)
  }
}
