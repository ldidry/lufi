# Terraform-AWS-Lufi

 This terraform plan create the resourcess of EC2 instance

## Terraform Variables
 Edit the `vars.tf` file to add the variables as per your need.

| Variable name | Value | Description |
| ------------- | ----- | ----------- |
| `aws_region` | us-east-1 | Set the region  |
| `vpc_cidr` | 10.0.0.0/16 | Set the cidr value for the vpc |
| `public_subnet_cidr` | 10.0.2.0/24 | Set the cidr value for the public subnet |
| `user` | ubuntu | Set the EC2 instance user name |
| `public_key` | /home/user_name/.ssh/id_rsa_pub | Set the publickey value for the ec2 instance from the host machine |
| `private_key` | /home/user_name/.ssh/id_rsa | Set the private key value for the ec2 instance from the hostmachine |
| `aws_access_key` | AWSACCESSKEY | Enter your aws access key |
| `aws_secrete_key` | AWSSECRETEKEY | Enter your aws secrete key |
| `instance_name` | Lufi_app_instance | Set the name for instance |
