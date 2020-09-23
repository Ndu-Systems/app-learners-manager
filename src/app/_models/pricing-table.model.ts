export interface PricingTableModel {
    Heading: string;
    SubHeading: string;
    
    prices?: PricingModel [];
}

export interface PricingModel {
    cardHeader?: string;
    imageUrl?:string;
    price: string;
    frequency?: string;
    validity: string;
    offeringPrices?: PricingModel[];
}