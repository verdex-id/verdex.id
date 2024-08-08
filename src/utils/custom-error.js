export function ErrorWithCode(msg = "", code = 500) {
  this.message = msg;
  this.code = code;
}
ErrorWithCode.prototype = new Error();

export function FailError(msg = "", code = 500, detail = null) {
  this.message = msg;
  this.code = code;
  this.detail = detail;
}
FailError.prototype = new Error();
