import { GraphQLError } from "graphql";

export const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10)
  }
  return null
}


export const parseIntUnSafe = (value: string): number => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10)
  }
  throw new GraphQLError(
    `can not parse number.`
  )
}

export const applyTakeConstraints = (params: { min: number; max: number; value: number }) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
    )
  }
  return params.value
}

export const sleep = (time: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('I am slow')
    }, time);
  })
}
