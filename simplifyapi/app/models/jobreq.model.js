module.exports = (sequelize, Sequelize) => {
    const Jobreq = sequelize.define("jobreq", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.INTEGER
      }
    });
    return Jobreq;
  };