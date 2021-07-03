import { UserController } from '../controllers/user.controller';
import { ErrorRouter } from '../errors/ErrorRouter';

const router = new ErrorRouter();

router.get('/', UserController.getUsers);

export const userRoutes = router.router;
