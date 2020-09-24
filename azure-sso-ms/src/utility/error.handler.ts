export const errorHandler = (code, error) => {
  return {
    code,
    error,
    status: 'error',
    data: null
  }
}