import { GraphQLContext } from "../../context";
import { sleep } from "../../util"

export default {

  async slow(parent: unknown, { time }: { time?: number | null }, context: GraphQLContext): Promise<string> {
    const response = await sleep(time || 5000)
    return response
  }
}

