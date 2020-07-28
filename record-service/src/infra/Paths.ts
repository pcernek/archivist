import { join } from 'path'

export class Paths {
  public static RECORD_SERVICE_ROOT = join(__dirname, '../../')
  
  public static LOCAL_STORAGE_DIR = join(Paths.RECORD_SERVICE_ROOT, 'local_storage')
}
