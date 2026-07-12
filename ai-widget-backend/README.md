# AI Widget Backend Setup

This site's "Ask AI" widget works out of the box using a built-in offline FAQ engine (see
`src/components/ChatWidget.jsx`). To upgrade it to real Claude-powered answers:

## 1. Get an Anthropic API key
console.anthropic.com → API Keys → Create Key. Pay-as-you-go, no monthly fee.
Recommended model: Haiku 4.5 ($1/$5 per million tokens) — a few cents/month for typical traffic.

## 2. Deploy the Lambda backend
```bash
cd terraform
terraform init
terraform apply \
  -var="anthropic_api_key=sk-ant-xxxxxxxx" \
  -var="allowed_origin=https://your-deployed-site.pages.dev"
```
Copy the printed `function_url`.

## 3. Point the frontend at it
Create a `.env` file in the project root (not committed to git):
```
VITE_CHAT_ENDPOINT=https://your-function-url.lambda-url.ap-southeast-1.on.aws/
```
Rebuild (`npm run build`) and redeploy. If the endpoint is unset or unreachable, the widget
automatically falls back to the offline FAQ engine — it never looks broken to a visitor.

## Cost
- Lambda: free tier covers 1M requests/month permanently.
- Anthropic API: pay-per-token, likely well under $1/month for a personal portfolio.
