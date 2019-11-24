exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const create22P02ErrorMessage = message => {
    const details = err.message.split('- ')[1];
    const detailSplit = details.split(': ');
    return `${detailSplit[1]} is an ${detailSplit[0]}${
      detailSplit[1] === '"NaN"' ? ' (votes value)' : ''
    }`;
  };
  const errRef = {
    '22P02': {
      status: 400,
      // getting the information from the error message
      msg: create22P02ErrorMessage(err.msg)
    }
  };
  if (err.code) {
    const error = errRef[err.code];
    res.status(error.status).send({ msg: error.msg });
  }
};
