import e from 'express';
import jwt from 'jsonwebtoken';

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {

            // Bearer 62135461
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Token này đã hết hạn' })
                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json({ message: 'Bạn chưa được xác thực !' });
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json({ message: 'Bạn không có quyền Admin' });
            }
        });
    }
}
export default middlewareController;