import { NextRequest, NextResponse } from 'next/server';

type EligibilityRequest = {
    name: string;
    email: string;
    phone: string;
    monthlyIncome: number;
    option: 'financing' | 'outright';
};

type EligibilityResponse = {
    status: 'eligible' | 'ineligible';
    message: string;
};

interface StoredLead extends EligibilityRequest {
    status: 'eligible' | 'ineligible';
}

const leads: StoredLead[] = [];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, monthlyIncome, option }: EligibilityRequest = body;

        if (!name || !email || !phone || !monthlyIncome || !option) {
            return new Response(
                JSON.stringify({ status: 'error', message: 'Missing required fields.' }),
                { status: 400 }
            );
        }

        const income = Number(monthlyIncome);
        let status: 'eligible' | 'ineligible' = 'ineligible';
        let message = '';

        if (option === 'financing') {
            if (income >= 180_000) {
                status = 'eligible';
                message = 'You are eligible for zero-interest financing.';
            } else {
                message = 'Minimum monthly income for financing is ₦180,000.';
            }
        } else if (option === 'outright') {
            if (income >= 500_000 || option === 'outright') {
                status = 'eligible';
                message = 'You are eligible for cash purchase.';
            } else {
                message = 'Minimum income for cash purchase is ₦500,000.';
            }
        } else {
            message = 'Invalid purchase option.';
        }

        // Save lead data to mock database
        leads.push({ name, email, phone, monthlyIncome: income, option, status });

        return NextResponse.json({ status, message });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Server error.';
        return new Response(
            JSON.stringify({ status: 'error', message: errorMessage }),
            { status: 500 }
        );
    }
}