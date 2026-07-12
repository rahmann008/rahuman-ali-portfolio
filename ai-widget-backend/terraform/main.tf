terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-southeast-1" # Singapore — closest to Malaysia
}

variable "anthropic_api_key" {
  description = "Anthropic API key (from console.anthropic.com)"
  type        = string
  sensitive   = true
}

variable "allowed_origin" {
  description = "Your deployed site's origin, e.g. https://rahumanali.com"
  type        = string
}

# --- Package the Lambda source ---
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda"
  output_path = "${path.module}/build/portfolio-ai-widget.zip"
}

# --- IAM role for Lambda execution ---
resource "aws_iam_role" "lambda_exec" {
  name = "portfolio-ai-widget-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# --- Lambda function ---
resource "aws_lambda_function" "ai_widget" {
  function_name    = "portfolio-ai-widget"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 15
  memory_size      = 256

  environment {
    variables = {
      ANTHROPIC_API_KEY = var.anthropic_api_key
      ALLOWED_ORIGIN    = var.allowed_origin
    }
  }
}

# --- Function URL: public HTTPS endpoint, no API Gateway needed ---
resource "aws_lambda_function_url" "ai_widget_url" {
  function_name      = aws_lambda_function.ai_widget.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = [var.allowed_origin]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}

output "function_url" {
  description = "Paste this into CHAT_ENDPOINT in index.html"
  value       = aws_lambda_function_url.ai_widget_url.function_url
}
