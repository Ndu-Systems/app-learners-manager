export interface BillingModel {
    BillingId?: string;
    UserId?: string;
    BillingTypeId?: string;
    Name?: string;
    Amount: number;
    AmountPaid: number;
    AmountDue: number;
    NextBillingDate: string;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: string;
}