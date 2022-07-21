export const catchify = async <R, E>(
  fn: () => Promise<any>,
): Promise<[null | R, null | E]> => {
  try {
    const res = await fn();
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
