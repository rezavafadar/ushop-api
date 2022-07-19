export const dataFilter = <T extends Record<string, any>>(
  object: T,
  keys: Array<keyof T>,
): Pick<T, keyof T> =>
  Object.entries(object).reduce(
    (acc, [key, value]) =>
      keys.includes(key) ? acc : { ...acc, [key]: value },
    {} as Pick<T, keyof T>,
  );
