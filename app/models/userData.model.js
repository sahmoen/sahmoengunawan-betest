module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      userName: String,
      password: String,
      accountNumber: Number,
      emailAddress: String,
      identityNumber: String,
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.Id = _id;

    return object;
  });

  return mongoose.model("User", schema);
};
