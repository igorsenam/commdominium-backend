const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: "Nenhum token providenciado" });
  
  const parts = authHeader.split(' ');

  if (!parts.lenght === 2)
    return res.status(401).send({ error: 'Erro no token' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });
  
  jwt.verify(token, process.env.SECRET, (err, decoded) =>{
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    return next();
  });
}