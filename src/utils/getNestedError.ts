export const getNestedError = (errors: Record<string, any>, name: string) =>
  name.split('.').reduce((obj: any, key: string) => obj?.[key], errors);
