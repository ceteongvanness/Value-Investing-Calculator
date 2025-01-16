# Value Investing Calculator

A production-ready React application for value investing analysis, featuring Benjamin Graham's investment principles, modern DCF analysis, and NCAV calculations. Built with TypeScript and deployed on AWS EKS using Docker and Kubernetes.

## Overview

This calculator helps investors analyze stocks using three major valuation methods:
- Graham's Formula (√(22.5 × EPS × Book Value))
- Discounted Cash Flow (DCF) Analysis
- Net Current Asset Value (NCAV)

## Repository Structure
```
value-calculator/
├── src/
│   └── components/
│       └── ValueInvestingCalculator.tsx    # Main calculator component
├── k8s/
│   ├── deployment.yaml                     # Kubernetes deployment config
│   ├── service.yaml                        # Kubernetes service config
│   ├── hpa.yaml                           # Horizontal Pod Autoscaler
│   └── network-policy.yaml                # Network security policies
├── .github/
│   └── workflows/
│       └── deploy.yml                      # GitHub Actions pipeline
├── Dockerfile                             # Docker configuration
├── nginx.conf                             # Nginx configuration
└── README.md                              # This file
```

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Docker Development
```bash
# Build image
docker build -t value-calculator .

# Run container
docker run -p 80:80 value-calculator
```

## Features

### Valuation Methods
1. **Graham's Formula**
   - Conservative valuation estimate
   - Based on earnings and book value
   - Suitable for stable companies

2. **DCF Analysis**
   - Projects future cash flows
   - Adjustable growth rates
   - Customizable discount rates

3. **NCAV Calculation**
   - Ultra-conservative approach
   - Focus on liquid assets
   - Strong margin of safety

### Technical Features
- TypeScript for type safety
- React for UI components
- Real-time calculations
- Responsive design
- Input validation
- Error handling

## Deployment

### Prerequisites
- AWS CLI configured
- kubectl installed
- Docker installed
- Node.js ≥ 18

### AWS EKS Setup
```bash
# Create EKS cluster
eksctl create cluster \
  --name value-calculator-cluster \
  --region us-west-2 \
  --nodes 3

# Configure kubectl
aws eks update-kubeconfig --name value-calculator-cluster
```

### Deploy Application
```bash
# Deploy to Kubernetes
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Verify deployment
kubectl get pods -n value-calculator
```

## Infrastructure Costs

### AWS Resources (Monthly Estimate)
- EKS Cluster: $73
- 3 x t3.medium nodes: ~$99
- Load Balancer: ~$16.20
- ECR Storage: $0.10/GB
- Data Transfer: $0.09/GB (after 1GB)

### Cost Optimization
- Use Spot Instances where possible
- Implement auto-scaling
- Regular monitoring of resource usage

## Security

### Network Security
- Private VPC configuration
- Network policies for pod isolation
- Security groups for access control

### Access Control
- RBAC implementation
- Pod security policies
- Service account configuration

## Monitoring

### Kubernetes Resources
```bash
# Check deployment status
kubectl get deployments -n value-calculator

# View pod logs
kubectl logs -f deployment/value-calculator -n value-calculator
```

### AWS CloudWatch
- CPU utilization monitoring
- Memory usage tracking
- Custom metrics available

## Backup & Recovery

### Backup Procedures
```bash
# Create backup
velero backup create value-calculator-backup \
  --include-namespaces value-calculator

# Schedule regular backups
kubectl apply -f k8s/backup-schedule.yaml
```

### Recovery
```bash
# Restore from backup
velero restore create \
  --from-backup value-calculator-backup
```

## Troubleshooting

### Common Issues
1. Pod Startup Failures
   ```bash
   kubectl describe pod <pod-name> -n value-calculator
   ```

2. Service Connection Issues
   ```bash
   kubectl get svc value-calculator-service -n value-calculator
   ```

3. Deployment Issues
   ```bash
   kubectl rollout status deployment/value-calculator
   ```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Support
For issues and feature requests, please create an issue in the GitHub repository.

## License
MIT License - free to use and modify.
