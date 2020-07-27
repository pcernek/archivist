import * as path from 'path'
import * as fs from 'fs';
import * as util from 'util';
import { v4 as uuid } from 'uuid'
import { Paths } from './Paths';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir)
const readdirAsync = util.promisify(fs.readdir)
const unlinkAsync = util.promisify(fs.unlink)

export class LocalStorage<T> {
  private static DEFAULT_EXTENSION = '.json'
  private readonly basePath: string

  public static async build<T>(resourceName: string): Promise<LocalStorage<T>> {
    const storage = new LocalStorage<T>(resourceName)
    await storage.createStorageDirectory()
    return storage
  }

  private constructor(resourceName: string) {
    this.basePath = path.join(Paths.LOCAL_STORAGE_DIR, resourceName)
  }

  public async findById(id: string): Promise<T> {
    const fullPath = path.join(this.basePath, id + LocalStorage.DEFAULT_EXTENSION)
    const data = await readFileAsync(fullPath, { encoding: 'utf8' })
    return JSON.parse(data) as T
  }

  public async list(): Promise<string[]> {
    const files = await readdirAsync(this.basePath)
    return files.map(fileName => path.parse(fileName).name)
  }

  /**
   * 
   * @param data 
   * @returns the uuid of the resource created
   */
  public async create(data: T): Promise<string> {
    const id = uuid()
    const fullPath = this.getFullPath(id)
    await writeFileAsync(fullPath, JSON.stringify(data))
    return id
  }

  public async clear(): Promise<void> {
    for (const file of await readdirAsync(this.basePath)) {
      await unlinkAsync(path.join(this.basePath, file))
    }
  }

  private async createStorageDirectory(): Promise<void> {
    await mkdirAsync(this.basePath, { recursive: true })
  }

  private getFullPath(id: string): string {
    return path.join(this.basePath, `${id}.json`)
  }
}
