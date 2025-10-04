import { NextRequest, NextResponse } from 'next/server';

type EligibilityRequest = {
    income: number;
    option: 'financing' | 'outright';
};

type EligibilityResponse = {
    eligible: boolean;
    reason?: string;
};

export async function POST(req: NextRequest) {
    const { income, option }: EligibilityRequest = await req.json();

    let response: EligibilityResponse;

    if (option === 'financing') {
        if (income >= 180_000) {
            response = { eligible: true };
        } else {
            response = {
                eligible: false,
                reason: 'Financing requires a minimum monthly income of ₦180,000.',
            };
        }
    } else if (option === 'outright') {
        if (income >= 500_000) {
            response = { eligible: true };
        } else {
            response = {
                eligible: false,
                reason: 'Outright purchase requires a single payment of ₦500,000.',
            };
        }
    } else {
        response = {
            eligible: false,
            reason: 'Invalid purchase option.',
        };
    }

    return NextResponse.json(response);
}