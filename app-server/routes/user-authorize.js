module.exports = (req, res) => {
  const authorize = () => res.json({
    success: true
  });

  setTimeout(authorize, 2000);
};