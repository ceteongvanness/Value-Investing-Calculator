import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FinancialMetrics {
    eps: number;
    growthRate: number;
    requiredReturn: number;
    peRatio: number;
    bookValue: number;
    freeCashFlow: number;
    shares: number;
    netCurrentAssets: number;
    totalLiabilities: number;
}

interface ValuationResults {
    grahamValue: number;
    dcfValue: number;
    ncavValue: number;
}

class StockValuation {
    private metrics: FinancialMetrics;
    
    constructor(metrics: FinancialMetrics) {
        this.metrics = metrics;
    }

    public calculateGrahamValue(): number {
        const { eps, bookValue } = this.metrics;
        return Math.sqrt(22.5 * eps * bookValue);
    }

    public calculateDCF(): number {
        const {
            freeCashFlow,
            growthRate,
            requiredReturn,
            shares
        } = this.metrics;

        const years: number = 10;
        let presentValue: number = 0;
        let fcf: number = freeCashFlow;
        const discountRate: number = requiredReturn / 100;
        
        for (let i = 1; i <= years; i++) {
            fcf *= (1 + growthRate / 100);
            presentValue += fcf / Math.pow(1 + discountRate, i);
        }

        const terminalValue: number = (fcf * (1 + growthRate / 100)) / 
            (discountRate - growthRate / 100);
        const presentTerminalValue: number = terminalValue / 
            Math.pow(1 + discountRate, years);

        return (presentValue + presentTerminalValue) / shares;
    }

    public calculateNCAV(): number {
        const { netCurrentAssets, totalLiabilities, shares } = this.metrics;
        return (netCurrentAssets - totalLiabilities) / shares;
    }

    public calculateAllValues(): ValuationResults {
        return {
            grahamValue: this.calculateGrahamValue(),
            dcfValue: this.calculateDCF(),
            ncavValue: this.calculateNCAV()
        };
    }
}

const ValueCalculator: React.FC = () => {
    const [formData, setFormData] = useState<FinancialMetrics>({
        eps: 0,
        growthRate: 0,
        requiredReturn: 15,
        peRatio: 0,
        bookValue: 0,
        freeCashFlow: 0,
        shares: 0,
        netCurrentAssets: 0,
        totalLiabilities: 0
    });

    const [results, setResults] = useState<ValuationResults | null>(null);

    useEffect(() => {
        const valuation = new StockValuation(formData);
        setResults(valuation.calculateAllValues());
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Value Investing Calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">EPS</label>
                            <input
                                type="number"
                                name="eps"
                                value={formData.eps}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Growth Rate (%)</label>
                            <input
                                type="number"
                                name="growthRate"
                                value={formData.growthRate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Required Return (%)</label>
                            <input
                                type="number"
                                name="requiredReturn"
                                value={formData.requiredReturn}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Book Value</label>
                            <input
                                type="number"
                                name="bookValue"
                                value={formData.bookValue}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Free Cash Flow</label>
                            <input
                                type="number"
                                name="freeCashFlow"
                                value={formData.freeCashFlow}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Shares Outstanding</label>
                            <input
                                type="number"
                                name="shares"
                                value={formData.shares}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Net Current Assets</label>
                            <input
                                type="number"
                                name="netCurrentAssets"
                                value={formData.netCurrentAssets}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Total Liabilities</label>
                            <input
                                type="number"
                                name="totalLiabilities"
                                value={formData.totalLiabilities}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>

                    {results && (
                        <div className="mt-6 p-4 bg-gray-50 rounded">
                            <h3 className="font-medium mb-3">Valuation Results</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium">Graham Formula Value: </span>
                                    ${results.grahamValue.toFixed(2)}
                                </div>
                                <div>
                                    <span className="font-medium">DCF Value: </span>
                                    ${results.dcfValue.toFixed(2)}
                                </div>
                                <div>
                                    <span className="font-medium">NCAV per Share: </span>
                                    ${results.ncavValue.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ValueCalculator;