import "server-only"

import { defineLive } from "next-sanity";
import {client} from "./client";

export const {sanityFetch, SanityLive} = defineLive({
  serverToken: process.env.SANITY_API_READ_TOKEN,
  client: client.withConfig({
    useCdn: false,
  })
});