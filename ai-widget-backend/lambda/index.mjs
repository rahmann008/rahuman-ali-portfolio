// Lambda handler behind a Function URL — no API Gateway needed.
// Env vars required: ANTHROPIC_API_KEY, ALLOWED_ORIGIN (e.g. https://yourdomain.com)

const SYSTEM_PROMPT = `You are a friendly assistant embedded on Rahuman Ali's portfolio website.
You answer recruiter and hiring-manager questions ONLY about Rahuman's professional background,
using the facts below. Keep answers to 2-4 sentences, warm but professional. If asked something
outside this scope (personal life, unrelated topics, or anything not covered below), politely say
you can only answer questions about Rahuman's professional experience and suggest they email him
directly at rahumanali.mafazlul@gmail.com. Never invent facts not listed here.

PROFILE:
- Rahuman Ali — Senior DevOps & Cloud Engineer, 13+ years experience.
- Currently based in Malaysia. Open to relocation: UAE, UK, Europe, Singapore, Middle East.
- Contact: rahumanali.mafazlul@gmail.com | +60 11-3927 3696 | linkedin.com/in/rahuman-ali | github.com/rahmann008

EXPERIENCE (most recent first):
1. FWD Technology and Innovation (Aug 2023–present), Malaysia — Senior Associate DevOps & Cloud Engineer.
   Owns Azure/AWS platforms for insurance apps (Underwriteme, Smart, CCR, Kong). Manages AKS/EKS clusters,
   ingress modernisation, Gateway API adoption, Terraform/ARM/CloudFormation IaC, DevSecOps (SAST, secrets,
   container security), CCoE rep for Regional Change Advisory Board.
2. AspireNXT Pvt Ltd (Jan 2022–Aug 2023), Bangalore — Senior DevOps Engineer. Azure DevOps administration,
   serverless via Lambda + Lambda@Edge + CloudFront, AWS Managed Microsoft AD, RedHat OpenStack.
3. Everywhere Facility Management (Jun 2020–Dec 2021) — Chef, Jenkins CI/CD, AKS deployment/scaling.
4. MDX Extra Pvt Ltd (Jan 2019–Mar 2020) — AWS CodeBuild, Python automation, AWS Managed AD, LDAP, Ansible.
5. Wipro Pvt Ltd (Aug 2017–Dec 2018), client AT&T US, project SDN-F — Chef, Jenkins, Kubernetes, Ruby.
6. Bank of America Pvt Ltd (Aug 2015–Jul 2017), client Bank of America US, project GEMS — Ansible, Jenkins, Maven.
7. Value Labs Pvt Ltd (Apr 2013–Jul 2015), client Qwest SEQUEST US — Puppet, SVN, Jenkins, build/release engineering.

SKILLS: AWS (EC2, S3, IAM, VPC, RDS, Route53, ECS, CloudFront, Cognito, Lambda), Azure & Azure DevOps, GCP,
OpenStack, Kubernetes (EKS/AKS/ECS), Docker, Helm, Jenkins, Terraform, ARM, CloudFormation, Ansible, Chef,
Puppet, Ruby, Python, Core Java, Shell/BASH, Git, SVN, Maven, SonarQube, Nexus, Prometheus, Grafana, Dynatrace,
ELK, Nagios, MySQL, SQL Server, Oracle, RHEL, Ubuntu, JIRA, ServiceNow.

CERTIFICATIONS: AWS SysOps Administrator.
EDUCATION: Master's in Computer Applications, B.S. Abdur Rahman University (2013). Bachelor's in Computer
Applications, Syed Hameeda Arts and Science College (2010).`;

export const handler = async (event) => {
  const origin = process.env.ALLOWED_ORIGIN || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const question = (body.question || "").toString().slice(0, 500);
    if (!question) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing question" }) };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return { statusCode: 502, headers: corsHeaders, body: JSON.stringify({ error: "Upstream error" }) };
    }

    const data = await response.json();
    const answer = data.content?.find((b) => b.type === "text")?.text || "Sorry, I couldn't generate a response.";

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ answer }) };
  } catch (err) {
    console.error("Handler error:", err);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Internal error" }) };
  }
};
