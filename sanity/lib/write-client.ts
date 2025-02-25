import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "vX",
  useCdn: false,
  token,
})

if (!writeClient.config().token) {
  throw new Error('Write token not found. Check your environment variables.')
}