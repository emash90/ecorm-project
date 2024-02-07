const makePasswordManager = ({ bcrypt }) => {
  const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  const compare = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
  };

  return Object.freeze({
    encrypt,
    compare,
  });
}

module.exports = makePasswordManager;