module.exports = function (method) {
  return function (req, res, next) {
    method(req, res, next).then(data => {
      res.json({ success: true, data });
    }).catch(error => {
      res.json({ success: false, message: error.message });
    })
  };
};
