class ApiError extends Error {
  constructor( ecode, ...params ) {
    super(...params);
    this.ecode = ecode
  }
}
export default ApiError


