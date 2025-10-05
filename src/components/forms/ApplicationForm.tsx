"use client";
import React, { useState } from "react";

const forestGreen = "#228B22";
const goldenRod = "#FFD700";

type PurchaseOption = "financing" | "outright";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    monthlyIncome: string;
    purchaseOption: PurchaseOption;
}

const initialForm: FormData = {
    fullName: "",
    email: "",
    phone: "",
    monthlyIncome: "",
    purchaseOption: "financing",
};

export default function ApplicationForm() {
    const [form, setForm] = useState<FormData>(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | { eligible: boolean; message: string }>(null);

    function validate(): boolean {
        const newErrors: typeof errors = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required";
        if (!form.phone.match(/^\d{10,15}$/)) newErrors.phone = "Valid phone required";
        if (!form.monthlyIncome || isNaN(Number(form.monthlyIncome)) || Number(form.monthlyIncome) <= 0)
            newErrors.monthlyIncome = "Enter valid monthly income";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/eligibility", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({ eligible: false, message: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    }

    function renderResult() {
        if (!result) return null;
        if (result.eligible) {
            return (
                <div style={{ color: forestGreen, marginTop: 16 }}>
                    <strong>✅ {result.message || "You are eligible!"}</strong>
                    <br />
                    <button
                        style={{
                            marginTop: 12,
                            background: forestGreen,
                            color: goldenRod,
                            border: "none",
                            padding: "10px 24px",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                        type="button"
                        onClick={() => window.location.href = "/membership"}
                    >
                        Proceed to Membership Application
                    </button>
                </div>
            );
        }
        return (
            <div style={{ color: "crimson", marginTop: 16 }}>
                <strong>❌ {result.message || "You are not eligible."}</strong>
                <br />
                <a
                    href="mailto:support@farmchain.coop"
                    style={{ color: goldenRod, textDecoration: "underline", marginTop: 8, display: "inline-block" }}
                >
                    Contact Support
                </a>
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: 420,
                margin: "40px auto",
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 16px rgba(34,139,34,0.12)",
                padding: 32,
                border: `2px solid ${forestGreen}`,
            }}
        >
            <h2 style={{ color: forestGreen, marginBottom: 24 }}>Eligibility Test</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: forestGreen, fontWeight: 500 }}>
                        Full Name
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: 4,
                                borderRadius: 6,
                                border: `1px solid ${goldenRod}`,
                            }}
                        />
                    </label>
                    {errors.fullName && <div style={{ color: "crimson", fontSize: 13 }}>{errors.fullName}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: forestGreen, fontWeight: 500 }}>
                        Email
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: 4,
                                borderRadius: 6,
                                border: `1px solid ${goldenRod}`,
                            }}
                        />
                    </label>
                    {errors.email && <div style={{ color: "crimson", fontSize: 13 }}>{errors.email}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: forestGreen, fontWeight: 500 }}>
                        Phone Number
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: 4,
                                borderRadius: 6,
                                border: `1px solid ${goldenRod}`,
                            }}
                            placeholder="e.g. 08012345678"
                        />
                    </label>
                    {errors.phone && <div style={{ color: "crimson", fontSize: 13 }}>{errors.phone}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: forestGreen, fontWeight: 500 }}>
                        Monthly Income (₦)
                        <input
                            type="number"
                            value={form.monthlyIncome}
                            onChange={e => setForm(f => ({ ...f, monthlyIncome: e.target.value }))}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: 4,
                                borderRadius: 6,
                                border: `1px solid ${goldenRod}`,
                            }}
                            min={0}
                        />
                    </label>
                    {errors.monthlyIncome && <div style={{ color: "crimson", fontSize: 13 }}>{errors.monthlyIncome}</div>}
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ color: forestGreen, fontWeight: 500 }}>
                        Purchase Option
                        <div style={{ marginTop: 4 }}>
                            <label style={{ marginRight: 16 }}>
                                <input
                                    type="radio"
                                    name="purchaseOption"
                                    value="financing"
                                    checked={form.purchaseOption === "financing"}
                                    onChange={() => setForm(f => ({ ...f, purchaseOption: "financing" }))}
                                />{" "}
                                Financing (₦50,000/month for 12 months)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="purchaseOption"
                                    value="outright"
                                    checked={form.purchaseOption === "outright"}
                                    onChange={() => setForm(f => ({ ...f, purchaseOption: "outright" }))}
                                />{" "}
                                Outright Purchase (₦500,000 single payment)
                            </label>
                        </div>
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: goldenRod,
                        color: forestGreen,
                        border: "none",
                        padding: "10px 24px",
                        borderRadius: 6,
                        fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer",
                        width: "100%",
                        fontSize: 16,
                    }}
                >
                    {loading ? "Checking..." : "Check Eligibility"}
                </button>
            </form>
            {renderResult()}
        </div>
    );
}
