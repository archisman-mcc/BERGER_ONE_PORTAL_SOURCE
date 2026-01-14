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
        "achievement_target": 75,
        "total_sales_mtd": 100,
        "total_sales_ytd": 101,
        "total_sales_growth_mtd": 10,
        "total_sales_growth_ytd": 11,
        "odos_mtd": 42,
        "odos_ytd": 43,
        "odos_growth_mtd": 10,
        "odos_growth_ytd": 11,
        "dealer_sales_mtd": 100,
        "dealer_sales_ytd": 101,
        "dealer_sales_growth_mtd": 10,
        "dealer_sales_growth_ytd": 11,
        "total_dealer_count": 100,
        "contractor_sales_mtd": 100,
        "contractor_sales_ytd": 101,
        "contractor_sales_growth_mtd": 10,
        "contractor_sales_growth_ytd": 11,
        "total_contractor_count": 100,
        "fabrication_sales_mtd": 100,
        "fabrication_sales_ytd": 101,
        "fabrication_sales_growth_mtd": 10,
        "fabrication_sales_growth_ytd": 11,
        "total_fabrication_count": 100,
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
        achievement_target: 50,
        total_sales_mtd: 102,
        total_sales_ytd: 103,
        total_sales_growth_mtd: 12,
        total_sales_growth_ytd: 13,
        odos_mtd: 44,
        odos_ytd: 45,
        odos_growth_mtd: 12,
        odos_growth_ytd: 13,
        dealer_sales_mtd: 102,
        dealer_sales_ytd: 103,
        dealer_sales_growth_mtd: 12,
        dealer_sales_growth_ytd: 13,
        total_dealer_count: 102,
        contractor_sales_mtd: 102,
        contractor_sales_ytd: 103,
        contractor_sales_growth_mtd: 12,
        contractor_sales_growth_ytd: 13,
        total_contractor_count: 102,
        fabrication_sales_mtd: 102,
        fabrication_sales_ytd: 103,
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
        achievement_target: 25,
        total_sales_mtd: 104,
        total_sales_ytd: 105,
        total_sales_growth_mtd: 14,
        total_sales_growth_ytd: 15,
        odos_mtd: 44,
        odos_ytd: 45,
        odos_growth_mtd: 14,
        odos_growth_ytd: 15,
        dealer_sales_mtd: 104,
        dealer_sales_ytd: 105,
        dealer_sales_growth_mtd: 14,
        dealer_sales_growth_ytd: 15,
        total_dealer_count: 104,
        contractor_sales_mtd: 104,
        contractor_sales_ytd: 105,
        contractor_sales_growth_mtd: 14,
        contractor_sales_growth_ytd: 15,
        total_contractor_count: 104,
        fabrication_sales_mtd: 104,
        fabrication_sales_ytd: 105,
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
