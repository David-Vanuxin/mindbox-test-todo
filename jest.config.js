/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    verbose: true,
  };
};