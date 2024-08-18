import { RecordStore, IStoredRecord } from './RecordStore'
import { LocalStorage } from '../../infra/LocalStorage'
import { PostRecordOperation } from './PostRecordOperation'
import { ListRecordOperation } from './ListRecordOperation'
import { GetRecordOperation } from './GetRecordOperation'
import { ILogger } from '../../infra/Logger'

export class RecordOperations {
  public static async build(logger: ILogger) {
    const recordStore = new RecordStore(
      await LocalStorage.build<Omit<IStoredRecord, 'id'>>('record')
    )
    const postOperation = new PostRecordOperation(async (data: string) => recordStore.create(data))
    const listOperation = new ListRecordOperation(async () => recordStore.list())
    const getOperation = new GetRecordOperation(async (id: string) => recordStore.findById(id))
    return {
      post: postOperation.build(),
      get: getOperation.build(),
      list: listOperation.build()
    }
  }
}
