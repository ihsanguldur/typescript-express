import jwt from 'jsonwebtoken';

const generateToken = function(id: number) {
    console.log(id);
    return jwt.sign({id}, 'private', {expiresIn: '1h'});
}

export default generateToken;