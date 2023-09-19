export const flip = <T extends object>(data: T) =>
  Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]))
