import jwt from 'jsonwebtoken'

   export const autenticarToken = (req, res, next)=> {
    if(req.url.includes('login')){
      next();
      return true;
    } 
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.CLAVE, (err, decoded) => {
        if (err) return res.status(403).json([{ message: 'ERROR: Token Inválido' }]);
        next();
      });
    } else {
      res.status(401).json([{ message: 'ERROR: Token Perdido' }]);
    }
  }
