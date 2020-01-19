/* GET Homepage */
const index = (req, res) => {
  res.render('index', { title: 'Express' });
};

const about = (req, res) => {
  res.send('Okay this id the about us page');
};

module.exports = {
  index,
  about
};
