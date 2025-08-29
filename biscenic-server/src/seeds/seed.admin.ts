import mongoose from 'mongoose';
import Role from '../models/role.model';

(async () => {
    try {
        await mongoose.connect('mongodb://localhost/your-db');

        const roles = ['admin', 'user'];
        for (const roleName of roles) {
            const existingRole = await Role.findOne({ name: roleName });
            if (!existingRole) {
                await Role.create({ name: roleName });
                console.log(`${roleName} role created`);
            }
        }

        console.log('Roles seeding completed');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Error seeding roles:', err);
    }
})();
