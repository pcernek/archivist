import { LocalStorage } from '../../infra/LocalStorage'

export interface IStoredRecord {
  id: string
  data: string
}

export class RecordStore {
  constructor(private readonly storage: LocalStorage<Omit<IStoredRecord, 'id'>>) {

  }

  public async create(data: string): Promise<string> {
    const id = await this.storage.create({ data })
    return id
  }

  public async findById(id: string): Promise<IStoredRecord> {
    const result = await this.storage.findById(id)
    return { ...result, id }
  }

  public async list(): Promise<string[]> {
    return this.storage.list()
  }

  public async clear(): Promise<void> {
    await this.storage.clear()
  }
}
