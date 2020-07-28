import { Logger } from './infra/Logger'
import { ExpressApplication } from './infra/ExpressApplication'

const logger = new Logger('archivist')

async function main(): Promise<void> {
  const port = 3000
  await new ExpressApplication(logger).start(port)
}

main().catch((error) => {
  logger.err(error)
  process.exit(1)
})
