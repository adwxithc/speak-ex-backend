import IAdmin from '../../../domain/admin';

export interface IAdminRepository {
    findAdminByEmail(email: string): Promise<IAdmin | null>;
}
