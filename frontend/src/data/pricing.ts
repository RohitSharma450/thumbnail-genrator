import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI thumbnails per month",
            "Standard quality images",
            "3 styles presets",
            "16:9 & 1:1 aspect ratios",
            "Basic color schemes",
            "Email support",
            "No watermarks on downloads"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "200 AI thumbnails per month",
            "High-resolution output",
            "All styles + custom prompts",
            "All aspect ratios (16:9, 1:1, 9:16)",
            "Full color scheme library",
            "Priority generation queue",
            "Batch export & bulk download",
            "No watermarks on downloads"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Unlimited AI thumbnails",
            "High-resolution output",
            "API access for integrations",
            "Team workspace",
            "Dedicated account manager",
            "Custom style training",
            "Commercial license",
            "SSO & advanced security",
            "SLA & 24/7 support"
        ],
        mostPopular: false
    }
];