import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Un jeton est requis pour l\'authentification');
    }

    try {
        const decoded = jwt.verify(token, 'votre-clé-secrète');
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Jetons invalide');
    }
    return next();
};

const checkRole = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Non autorisé');
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).send('Accès refusé');
    }

    next();
};

export { verifyToken, checkRole };
