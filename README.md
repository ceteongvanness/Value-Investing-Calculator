# Value Investing Calculator

A modern React application for value investing analysis, implementing Benjamin Graham's investment principles with TypeScript and Tailwind CSS.

## Features

- Graham's Formula Calculation (√(22.5 × EPS × Book Value))
- Discounted Cash Flow (DCF) Analysis
- Net Current Asset Value (NCAV) Calculation
- Real-time calculations
- Responsive design
- TypeScript type safety

## Prerequisites

- Node.js ≥ 18
- npm ≥ 8

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## Project Structure

```
value-calculator/
├── src/
│   ├── components/
│   │   ├── ValueInvestingCalculator.tsx    # Main calculator component
│   │   └── ui/
│   │       └── card.tsx                    # Card UI component
│   ├── lib/
│   │   └── utils.ts                        # Utility functions
│   ├── main.tsx                            # Application entry point
│   └── index.css                           # Global styles
├── public/
├── k8s/                                    # Kubernetes configurations
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── network-policy.yaml
├── .github/
│   └── workflows/
│       └── deploy.yml                      # GitHub Actions pipeline
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── Dockerfile
└── README.md
```

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/ceteongvanness/value-calculator.git
cd value-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Support

Build the Docker image:
```bash
docker build -t value-calculator .
```

Run the container:
```bash
docker run -p 80:80 value-calculator
```

## Kubernetes Deployment

1. Configure kubectl:
```bash
aws eks update-kubeconfig --name value-calculator-cluster --region us-west-2
```

2. Deploy to Kubernetes:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

3. Verify deployment:
```bash
kubectl get pods -n value-calculator
```

## Investment Calculations

### Graham's Formula
- Uses √(22.5 × EPS × Book Value)
- Provides conservative valuation estimate
- Best for stable, dividend-paying companies

### DCF Analysis
- Projects future cash flows
- Uses customizable growth rate
- Incorporates terminal value

### NCAV Calculation
- Ultra-conservative approach
- Focus on liquid assets
- Strong margin of safety

## Usage Examples

1. Basic Stock Valuation:
```typescript
const metrics = {
  eps: 3.5,
  bookValue: 25,
  freeCashFlow: 1000000,
  growthRate: 10,
  requiredReturn: 15,
  shares: 1000000
};

const calculator = new ValueCalculator();
const value = calculator.calculateAllValues(metrics);
```

2. Portfolio Analysis:
```typescript
const portfolio = [
  { symbol: "AAPL", metrics: {...} },
  { symbol: "MSFT", metrics: {...} }
];

portfolio.forEach(stock => {
  const value = calculator.calculateAllValues(stock.metrics);
  console.log(`${stock.symbol}: ${value.grahamValue}`);
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Best Practices

1. Input Data Verification
- Use latest financial statements
- Verify data accuracy
- Consider industry averages

2. Valuation Interpretation
- Use multiple valuation methods
- Apply margin of safety
- Consider qualitative factors

3. Code Quality
- Write tests for calculations
- Maintain type safety
- Follow ESLint rules

## Troubleshooting

Common issues and solutions:

1. TypeScript Errors:
```bash
# Regenerate TypeScript configuration
npx tsc --init
```

2. Missing Dependencies:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

3. Build Errors:
```bash
# Clear build cache
npm run build -- --force
```

## License

MIT License - see [LICENSE.md](LICENSE.md)

## Acknowledgments

- Based on Benjamin Graham's value investing principles
- Inspired by modern portfolio theory
- Uses industry-standard financial calculations

## Support

For issues and feature requests, please create an issue in the GitHub repository.