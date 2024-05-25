import ReportModel from '../../models/ReportModel';


export const listReports = async (
    { page, limit, reportModel }: { page: number; limit: number,reportModel:typeof ReportModel },
   
) => {
    const reports = await reportModel.find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
       
    const totalReports = await reportModel.countDocuments();
    
    return {reports,totalReports};
};