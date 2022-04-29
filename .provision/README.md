## ansible-role-lufi

An ansible role deploy the application on host machine(Ubuntu 20.04)

## terraform-aws-lufi

A terraform plan creates necessary AWS infrastructure to deploy lufi. This terraform plan uses the `lufi_startup.sh` script to deploy lufi on AWS and also uses above ansible role `ansible-role-lufi` to configure the application on AWS.