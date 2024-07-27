import { Req, Res } from '../../infrastructureLayer/types/expressTypes';
import { BadRequestError } from '../../usecaseLayer/errors';

import { IAccessRefreshToken } from '../../usecaseLayer/interface/services/IJwt.types';

import { IVideoSessionUseCase } from '../../usecaseLayer/interface/usecase/videoSessionUseCase';

export class VideoSessionController {
    constructor(private videoSessionUseCase: IVideoSessionUseCase) {}

    async rate(req: Req, res: Res) {
        const { rating } = req.body;
        const { sessionCode } = req.params;
        const { id } = req.user as IAccessRefreshToken;
        console.log(id, 'id shoule be end with fef');

        const result = await this.videoSessionUseCase.rate({
            sessionCode,
            userId: id,
            rating,
        });

        res.json({
            success: true,
            message: 'Rating saved',
            data: result,
        });
    }

    async report(req: Req, res: Res) {
        const { description } = req.body;
        const { sessionCode } = req.params;
        const { id } = req.user as IAccessRefreshToken;
        const result = await this.videoSessionUseCase.report({
            sessionCode,
            description,
            reporter: id,
        });

        res.json({
            success: true,
            message: 'Report saved',
            data: result,
        });
    }

    async getSession(req: Req, res: Res) {
        const { sessionCode } = req.params;

        const session = await this.videoSessionUseCase.getSession({
            sessionCode,
        });

        res.json({
            success: true,
            data: session,
        });
    }

    async listReports(req: Req, res: Res) {
        const { page = 1, limit = 5 } = req.query;

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if (typeof pageNumber !== 'number' || typeof limitNumber !== 'number') {
            throw new BadRequestError('invalid parameters');
        }

        const sessionReportsData = await this.videoSessionUseCase.listReports({
            page: pageNumber,
            limit: limitNumber,
        });

        res.status(200).json({
            success: true,
            data: sessionReportsData,
        });
    }

    async createCoinPurchasePlan(req: Req, res: Res) {
        const { count, title, price } = req.body;
        const { file } = req;
        const purchasePlan =
            await this.videoSessionUseCase.createCoinPurchasePlan({
                count,
                title,
                imageFile: file,
                price,
            });
        res.json({
            success: true,
            data: purchasePlan,
        });
    }

    async getPurchasePlans(req: Req, res: Res) {
        const sessionReportsData =
            await this.videoSessionUseCase.getPurchasePlans();

        res.status(200).json({
            success: true,
            data: sessionReportsData,
        });
    }

    async deletePurchasePlan(req: Req, res: Res) {
        const { id } = req.params;
        const plan = await this.videoSessionUseCase.deletePurchasePlan(id);
        res.json({
            success: true,
            data: plan,
        });
    }

    async payment(req: Req, res: Res) {
        const { userId, coinPurchasePlanId } = req.body;

        const paymentId = await this.videoSessionUseCase.createPayment({
            userId,
            coinPurchasePlanId,
        });

        res.json({
            success: true,
            data: paymentId,
        });
    }

    async webhook(req: Req, res: Res) {
        const payload = req.body;

        const signature = req.headers['stripe-signature'] as string;

        await this.videoSessionUseCase.paymentConfirmation({
            signature,
            payload,
        });

        res.json({ received: true });
    }

    async getSessionData(req: Req, res: Res) {
        const { userId } = req.params;
        const eligibility = await this.videoSessionUseCase.getSessionData(
            userId
        );
        res.json({
            success: true,
            data: eligibility,
        });
    }

    async requestMonetization(req: Req, res: Res) {
        const { id } = req.user as IAccessRefreshToken;
        const { description } = req.body;
        const result = await this.videoSessionUseCase.requestMonetization({
            userId: id,
            description,
        });

        res.json({
            success: true,
            data: result,
        });
    }

    async getMonetizationRequests(req: Req, res: Res) {
        const { page = 1, limit = 5, status = 'all' } = req.query;

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if (typeof pageNumber !== 'number' || typeof limitNumber !== 'number') {
            throw new BadRequestError('invalid parameters');
        }

        const requestData =
            await this.videoSessionUseCase.listMonetizationRequests({
                page: pageNumber,
                limit: limitNumber,
                status: status as string,
            });

        res.status(200).json({
            success: true,
            data: requestData,
        });
    }

    async updateMonetizationStatus(req: Req, res: Res) {
        const { userId } = req.params;
        const { status } = req.body;
        const result = await this.videoSessionUseCase.updateMonetizationStatus({
            userId,
            status,
        });

        res.json({
            success: true,
            data: result,
        });
    }

    async getVideoSessions(req: Req, res: Res) {
        const { id } = req.user as IAccessRefreshToken;
        const { page = 1, limit = 5, type = 'all' } = req.query;

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if (typeof pageNumber !== 'number' || typeof limitNumber !== 'number') {
            throw new BadRequestError('invalid parameters');
        }

        const videoSessionDatas =
            await this.videoSessionUseCase.getVideoSessions({
                userId: id,
                page: pageNumber,
                limit: limitNumber,
                type: type as string,
            });

        res.status(200).json({
            success: true,
            data: videoSessionDatas,
        });
    }

    async getTransactions(req: Req, res: Res) {
        const { id } = req.user as IAccessRefreshToken;
        const { page = 1, limit = 5, type = 'all' } = req.query;

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if (typeof pageNumber !== 'number' || typeof limitNumber !== 'number') {
            throw new BadRequestError('invalid parameters');
        }

        const transactionDatas = await this.videoSessionUseCase.getTransactions(
            {
                userId: id,
                page: pageNumber,
                limit: limitNumber,
                type: type as string,
            }
        );

        res.status(200).json({
            success: true,
            data: transactionDatas,
        });
    }
}
