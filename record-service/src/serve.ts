import express from 'express'
import { IPostRecordBody, IRecordResponse } from '@archivist/record-service-interface'
import { Logger } from './infra/Logger'
import { Routes } from './Routes'

const logger = new Logger('archivist')

async function main(): Promise<void> {
  const app = express()
  const port = 3000
  const routes = await Routes.build()

  app.get('/', (_, res) => res.send('Hello world from Archivist!'))

  app.post('/record', async (req, res) => {
    const requestBody = req.body as IPostRecordBody
    const responseBody: IRecordResponse = await routes.record.post(requestBody)
    return res.json(responseBody)
  })

  app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
}

main().catch((error) => {
  logger.err(error)
  process.exit(1)
})
