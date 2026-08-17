module.exports = function (req, res, next) {
  // req.user জেনারেট হবে আমাদের আগের auth মিডলওয়্যার থেকে
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};