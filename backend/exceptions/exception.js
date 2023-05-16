class RequiredException extends Error {
  constructor(propName) {
    super(`'${propName}' is required`);
    this.name = "RequiredException";
  }
}

module.exports = {
  RequiredException,
};
