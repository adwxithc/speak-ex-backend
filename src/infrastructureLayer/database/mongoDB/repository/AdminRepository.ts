import AdminModel from '../models/AdminModel';
import IAdmin from '../../../../domain/admin';
import { IAdminRepository } from '../../../../usecaseLayer/interface/repository/IAdminRepository';

import { findAdminByEmail } from './adminRepository/admin';

export class AdminRepository implements IAdminRepository {
    constructor(private adminModel: typeof AdminModel) {}

    async findAdminByEmail(email: string): Promise<IAdmin | null> {
        const admin = await findAdminByEmail(email, this.adminModel);
        return admin;
    }
}
