const db = require("../models");
const User = db.user;
const { comparePass, hashPassword } = require("../helpers/bcrypt");
const { tokenUser } = require("../helpers/token");

exports.create = (req, res, next) => {
  const { userName, accountNumber, emailAddress, identityNumber } = req.body;
  const password = hashPassword(req.body.password);

  User.findOne({
    emailAddress,
  })
    .then((data) => {
      if (!data) {
        User.create({
          userName,
          password,
          accountNumber,
          emailAddress,
          identityNumber,
        })
          .then(() => res.send({ message: "Success Add Data" }))
          .catch((err) => res.status(500).send({ message: err.message }));
      } else {
        throw { name: "Not Acceptable" };
      }
    })
    .catch((err) => next(err));
};

exports.login = (req, res, next) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    throw { name: "USER NOT FOUND" };
  }

  User.findOne({
    emailAddress,
  })
    .then((data) => {
      if (!data) {
        throw { name: "USER NOT FOUND" };
      }

      const checkPass = comparePass(password, data.password);
      if (!checkPass) {
        throw { name: "USER NOT FOUND" };
      }

      const token = tokenUser({ data });

      res.send({
        access_token: token,
      });
    })
    .catch((err) => next(err));
};

exports.findAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
      // console.log(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.findJustOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Data Not Found" });
      }
      res.send({ message: "Success Updated Data" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Data not Found" });
      }
      res.send({ message: "Success Deleted Data" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
