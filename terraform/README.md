# Optional AWS deployment with Terraform

This directory contains an **optional** AWS hosting configuration for CreatorFlow Studio. The default deployment remains GitHub Pages; Terraform is not required to run the app locally or use the existing Pages demo.

## What it creates

- A private S3 bucket for static-site files.
- An S3 public-access block.
- A CloudFront distribution and Origin Access Control.
- A bucket policy that allows the CloudFront distribution to read site objects.

The Terraform configuration does **not** upload the website files. A separate deployment step would be needed for that.

## Validate without AWS credentials

Install Terraform 1.9.x or a compatible release (the configuration requires Terraform >= 1.6 and < 2.0), then run from this directory:

```sh
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```

GitHub Actions runs these formatting, provider-initialization, and validation checks when Terraform files or its workflow change, and on manual dispatch.

## Before deploying

1. Review every resource and permission in `main.tf`.
2. Configure AWS credentials securely outside the repository; never commit access keys.
3. Review your AWS region, account permissions, naming, and cost estimates.
4. Run and inspect a Terraform plan before applying anything.
5. Confirm that the deployment is necessary before creating resources.

**Cost warning:** S3 and CloudFront can incur AWS charges. Do not run `terraform apply` unless you understand the plan and have intentionally approved the possible costs. This repository does not automatically deploy the Terraform resources.
