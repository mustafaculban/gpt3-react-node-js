class MainController {
  main(req, res) {
    res.render('index');
  }

  keyword(req, res) {
    res.render('keyword');
  }
}

module.exports = new MainController();
