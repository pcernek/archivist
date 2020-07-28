import { RecordStore, IStoredRecord } from './RecordStore'
import { LocalStorage } from '../../infra/LocalStorage'
import { PostRecord } from './PostRecord'
import { ListRecords } from './ListRecords'

export class RecordOperations {
  public static async build() {
    const recordStore = new RecordStore(
      await LocalStorage.build<Omit<IStoredRecord, 'id'>>('record')
    )
    await recordStore.clear()
    const postOperation = new PostRecord(async (data: string) => recordStore.create(data))
    const listOperation = new ListRecords(async () => recordStore.list())
    return {
      post: postOperation.post.bind(postOperation),
      list: listOperation.list.bind(listOperation)
    }
  }
}
