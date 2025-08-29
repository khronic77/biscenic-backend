//src/types/express.d.ts
import { UserRole } from '../interfaces/user.interfaces';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                roles: UserRole[];
            };
        }
    }
}
