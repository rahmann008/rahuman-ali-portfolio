export const projects = [
  {
    tag: "ENTERPRISE · FWD INSURANCE",
    featured: true,
    name: "Enterprise AKS Platform & Ingress Modernisation",
    description:
      "Leading the modernisation of enterprise Azure Kubernetes Service platforms — migrating NGINX ingress controllers to Gateway API across SIT, UAT, and Production while maintaining zero-downtime for 30+ microservices.",
    impact: "Improved routing reliability and resolved ingress end-of-life risk across production clusters.",
    tags: ["Azure", "AKS", "Terraform", "Helm", "Gateway API", "Azure DevOps"],
  },
  {
    tag: "ENTERPRISE · FWD INSURANCE",
    featured: true,
    name: "CI/CD Governance & DevSecOps Hardening",
    description:
      "Standardised CI/CD across Azure DevOps and Jenkins with governance, SAST/SCA remediation, secret management via Key Vault, and container security controls for audit readiness.",
    impact: "Faster, more reliable deployments and an audit-ready platform with reduced security findings.",
    tags: ["Azure DevOps", "Jenkins", "Key Vault", "SAST", "Terraform", "ELK"],
  },
  {
    tag: "PERSONAL PROJECT",
    featured: false,
    name: "Serverless Global Delivery Platform",
    description:
      "Designed a serverless front-end delivery architecture using Lambda@Edge and CloudFront for zero-delay content delivery across all regions.",
    impact: "Eliminated regional latency for a globally distributed user base.",
    tags: ["AWS Lambda", "CloudFront", "Lambda@Edge", "Terraform"],
  },
  {
    tag: "PERSONAL PROJECT",
    featured: false,
    name: "This Portfolio (You're Looking At It)",
    description:
      "Designed and built this site — React, Vite, Tailwind, and an AI assistant backed by Claude — as a working example of end-to-end delivery, from IaC to a deployed, serverless-backed frontend.",
    impact: "A live, self-hosted demonstration of full-stack DevOps practice.",
    tags: ["React", "Vite", "Tailwind", "Claude API"],
  },
];
