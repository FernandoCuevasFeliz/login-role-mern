import { AuthController } from '../controllers/auth.controller';
import { ErrorRouter } from '../errors/ErrorRouter';
import { signInValidator, signUpValidator } from '../validators/auth.validator';
const router = new ErrorRouter();

router.post('/signin', signInValidator, AuthController.signIn);
router.post('/signup', signUpValidator, AuthController.signUp);

export const authRoutes = router.router;
