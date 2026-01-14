export interface IDSRData {
    id: number;
    profile_image: string;
    cat_title: string;
    cat_heading: string;
    cat_designation: string;
    cat_region: string;
    cat_financial_year: string;
    achievement_target: number;
    total_sales_mtd: number;
    total_sales_ytd: number;
    total_sales_growth_mtd: number;
    total_sales_growth_ytd: number;
    odos_mtd: number;
    odos_ytd: number;
    odos_growth_mtd: number;
    odos_growth_ytd: number;
    dealer_sales_mtd: number;
    dealer_sales_ytd: number;
    dealer_sales_growth_mtd: number;
    dealer_sales_growth_ytd: number;
    total_dealer_count: number;
    total_dealer_count_growth_mtd: number;
    total_dealer_count_growth_ytd: number;
    contractor_sales_mtd: number;
    contractor_sales_ytd: number;
    contractor_sales_growth_mtd: number;
    contractor_sales_growth_ytd: number;
    total_contractor_count: number;
    total_contractor_count_growth_mtd: number;
    total_contractor_count_growth_ytd: number;
    fabrication_sales_mtd: number;
    fabrication_sales_ytd: number;
    fabrication_sales_growth_mtd: number;
    fabrication_sales_growth_ytd: number;
    total_fabrication_count: number;
    total_fabrication_count_growth_mtd: number;
    total_fabrication_count_growth_ytd: number;
    // childData: IDSRData[];
}

import basant from '../../assets/images/basant.png';
import BergerPaints from '../../assets/images/BergerPaints.jpg';
import user_profile from '../../assets/images/user_profile.png';
export const dsrdata: IDSRData[] = [
    {
        "id": 1,
        profile_image: BergerPaints,
        "cat_title": "All India",
        "cat_heading": "Performance Window - National Level (All India)",
        "cat_designation": "",
        "cat_region": "National Level (All India)",
        "cat_financial_year": "2024-25",
        "achievement_target": 31.03,
        "total_sales_mtd": 3413.78,
        "total_sales_ytd": 9939.68,
        "total_sales_growth_mtd": 1.38,
        "total_sales_growth_ytd": 1.38  ,
        "odos_mtd": 2203.3,
        "odos_ytd": 654.89,
        "odos_growth_mtd": 1,
        "odos_growth_ytd": 1,
        "dealer_sales_mtd": 52832.7,
        "dealer_sales_ytd": 49535.18,
        "dealer_sales_growth_mtd": 10,
        "dealer_sales_growth_ytd": 11,
        "total_dealer_count": 150,
        "contractor_sales_mtd": 14187.39,
        "contractor_sales_ytd": 14111.86,
        "contractor_sales_growth_mtd": 10,
        "contractor_sales_growth_ytd": 11,
        "total_contractor_count": 280,
        "fabrication_sales_mtd": 7822.69,
        "fabrication_sales_ytd": 8556.6,
        "fabrication_sales_growth_mtd": 10,
        "fabrication_sales_growth_ytd": 11,
        "total_fabrication_count": 90,
        "total_fabrication_count_growth_mtd": 10,
        "total_fabrication_count_growth_ytd": 11,
        "total_contractor_count_growth_mtd": 10,
        "total_contractor_count_growth_ytd": 11,
        "total_dealer_count_growth_mtd": 10,
        "total_dealer_count_growth_ytd": 11,
    },
    {
        "id": 2,
        profile_image: basant,
        cat_title: "Basant Kumar",
        cat_heading: "Performance Window - Regional Level (East Zone)",
        cat_designation: "Zonal Head - East",
        cat_region: "East Zone",
        cat_financial_year: "2024-25",
        achievement_target: 31.95,
        total_sales_mtd: 17395.7,
        total_sales_ytd: 17436.87,
        total_sales_growth_mtd: 12,
        total_sales_growth_ytd: 13,
        odos_mtd: 233.04,
        odos_ytd:  290.4,
        odos_growth_mtd: 12,
        odos_growth_ytd: 13,
        dealer_sales_mtd: 8380,
        dealer_sales_ytd: 8416,
        dealer_sales_growth_mtd: 12,
        dealer_sales_growth_ytd: 13,
        total_dealer_count: 102,
        contractor_sales_mtd: 5005,
        contractor_sales_ytd: 4710,
        contractor_sales_growth_mtd: 12,
        contractor_sales_growth_ytd: 13,
        total_contractor_count: 102,
        fabrication_sales_mtd: 4010,
        fabrication_sales_ytd: 4310,
        fabrication_sales_growth_mtd: 12,
        fabrication_sales_growth_ytd: 13,
        total_fabrication_count: 102,
        total_dealer_count_growth_mtd: 12,
        total_dealer_count_growth_ytd: 13,
        total_contractor_count_growth_mtd: 12,
        total_contractor_count_growth_ytd: 13,
        total_fabrication_count_growth_mtd: 12,
        total_fabrication_count_growth_ytd: 13,
    },
    {
        "id": 3,
        profile_image: user_profile,
        cat_title: "Arijit Saha",
        cat_heading: "Performance Window - Territory Level (Kolkata)",
        cat_designation: "Territory Head - Kolkata",
        cat_region: "Kolkata",
        cat_financial_year: "2024-25",
        achievement_target: 22.83,
        total_sales_mtd: 21.96,
        total_sales_ytd: 21.33,
        total_sales_growth_mtd: 14,
        total_sales_growth_ytd: 15,
        odos_mtd: 44,
        odos_ytd: 45,
        odos_growth_mtd: 14,
        odos_growth_ytd: 15,
        dealer_sales_mtd:10.48, 
        dealer_sales_ytd:10.03,
        dealer_sales_growth_mtd: 14,
        dealer_sales_growth_ytd: 15,
        total_dealer_count: 104,
        contractor_sales_mtd: 7.59,
        contractor_sales_ytd: 3.27,
        contractor_sales_growth_mtd: 14,
        contractor_sales_growth_ytd: 15,
        total_contractor_count: 104,
        fabrication_sales_mtd: 0,
        fabrication_sales_ytd: 6.33,
        fabrication_sales_growth_mtd: 14,
        fabrication_sales_growth_ytd: 15,
        total_fabrication_count: 104,
        total_dealer_count_growth_mtd: 14,
        total_dealer_count_growth_ytd: 15,
        total_contractor_count_growth_mtd: 14,
        total_contractor_count_growth_ytd: 15,
        total_fabrication_count_growth_mtd: 14,
        total_fabrication_count_growth_ytd: 15,
    }
]
