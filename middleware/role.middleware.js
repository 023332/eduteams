// Only one default export
export default function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
}

// If you want to export more, use named exports:
export function anotherMiddleware(req, res, next) {
  // ...code...
  next();
}