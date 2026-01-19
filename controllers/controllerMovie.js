function index(req, res) {
  res.send("sono index");
}

function show(req, res) {
  res.send("sono show");
}

const controller = {
  index,
  show,
};

export default controller;
