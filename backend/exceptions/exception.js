class RequiredException extends Error {
  /**
   * 
   * @param {string} propName property name
   */
  constructor(propName) {
    super(`'${propName}' is required`);
    this.name = "RequiredException";
  }
}

module.exports = {
  RequiredException,
};
