const db = require("../models");
const Jobreq = db.jobreq;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: jobreqs } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, jobreqs, totalPages, currentPage };
};

exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const jobreq = {
        title: req.body.title,
        description: req.body.description,
        budget: req.body.budget,
        published: req.body.published ? req.body.published : 1
    };

    Jobreq.create(jobreq)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Job Requirement."
            });
        });
};

exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Jobreq.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Job Requisition."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
    Jobreq.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Job Requisition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Job Requisition with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Jobreq.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job Requisition was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Job Requisition with id=${id}. Maybe Job Requisition was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Job Requisition with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Jobreq.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Job Requisition was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Job Requisition with id=${id}. Maybe Job Requisition was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Job Requisition with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Jobreq.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Job Requisition were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Job Requisition."
            });
        });
};

exports.findAllSubmitted = (req, res) => {
    Jobreq.findAll({ where: { published: 1 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job requisition."
            });
        });
};

exports.findAllReviewed = (req, res) => {
    Jobreq.findAll({ where: { published: 2 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job requisition."
            });
        });
};

exports.findAllApproved = (req, res) => {
    Jobreq.findAll({ where: { published: 3 } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job requisition."
            });
        });
};