
import { JWTToken } from '../../../services/jwt';
import { Protect } from '../../middlewares';



const jwtToken = new JWTToken();

const protect =  new Protect({jwt:jwtToken});

export {protect};