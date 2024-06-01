import INotification from '../../../../domain/notification';
import { INotificationRepository } from '../../../../usecaseLayer/interface/repository/INotification';
import NotificationModel from '../models/NotificationModel';
import { createNotification, getNotifications, markAsRead } from './notificationRepository/';

export class NotificationRepository implements INotificationRepository {
    constructor(private notificationModel: typeof NotificationModel) {}

    async createNotification(newNotification: INotification) {
        return await createNotification({
            newNotification,
            notificationModel: this.notificationModel,
        });
    }

    async markAsRead({
        notificationIds,
        userId,
    }: {
        notificationIds: string[];
        userId: string;
    }) {
        return await markAsRead({
            notificationIds,
            userId,
            notificationModel: this.notificationModel,
        });
    }

    async getNotifications({
        limit,
        page,
        userId,
    }: {
        limit: number;
        page: number;
        userId: string;
    }) {
        return getNotifications({ limit, page, userId, notificationModel:this.notificationModel });
    }
}
