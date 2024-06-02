import IAdmin from '../../../domain/admin';
import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';
import IPost from '../../../domain/post';
import IUser from '../../../domain/user';
import { IToken } from '../services/IJwt.types';

interface IDashboardNumerics{
    totalEarnings:{
        thisMonth:number;
        lastMonth:number
    },
    totalSessions:{
        thisMonth:number;
        lastMonth:number
    },
    totalProfit:{
        thisMonth:number;
        lastMonth:number
    }
}

export interface IAdminUseCase {
   
    //signin admin
    signin({email,password}:{email:string,password:string}): Promise<{admin:IAdmin,token:IToken} | never>
    updateUser({
        id,
        blocked,
    }: {
        id: string;
        blocked?: boolean;
        
    }): Promise<Omit<IUser, 'password'> | null>;

    getDashboardNumerics():Promise<IDashboardNumerics>
    getMonthlySessionsProfitSummary():Promise<{sessionCount:number;profit:number,month:string,year:string}[]>
  
    getPopularPurchasePlans():Promise<ICoinPurchasePlan[]>
    getPopularPost():Promise<IPost[]>
}
