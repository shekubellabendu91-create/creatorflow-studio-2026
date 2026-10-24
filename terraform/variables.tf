variable "aws_region" {
  description = "AWS region in which to create the static-site bucket and CloudFront distribution."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Lowercase project name used in resource names."
  type        = string
  default     = "creatorflow-studio"

  validation {
    condition     = can(regex("^[a-z0-9-]{3,40}$", var.project_name))
    error_message = "project_name must be 3-40 lowercase letters, numbers, or hyphens."
  }
}
