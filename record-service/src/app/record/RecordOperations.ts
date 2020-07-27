import { RecordStore, IStoredRecord } from './RecordStore'
import { LocalStorage } from '../../infra/LocalStorage'
import { PostRecord } from './PostRecord'

export class RecordOperations {
  public static async build() {
    const recordStore = new RecordStore(
      await LocalStorage.build<Omit<IStoredRecord, 'id'>>('record')
    )
    await recordStore.clear()
    const postOperation = new PostRecord(async (data: string) => recordStore.create(data))
    return {
      post: postOperation.post.bind(postOperation)
    }
  }
}
