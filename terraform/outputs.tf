output "bucket_name" {
  description = "Private S3 bucket for the static site files."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID."
  value       = aws_cloudfront_distribution.site.id
}

output "site_url" {
  description = "HTTPS URL for the deployed static site."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}
