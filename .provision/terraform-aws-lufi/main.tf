locals {
  user_data_vars = {
    user = var.lufi_owner
    group = var.lufi_group
    directory = var.app_dir
    contact_lufi = var.contact
    report_lufi = var.report
  }
}

#Create the VPC 
resource "aws_vpc" "vpc" {
  cidr_block           = "${var.vpc_cidr}"
  enable_dns_hostnames = true 
  enable_dns_support   = true
  instance_tenancy     = "default"
  tags                 = {
      Name             = "lufi-master-vpc"
  }
}

# Create InternetGateWay and attach to VPC

resource "aws_internet_gateway" "IGW" {
  vpc_id           = "${aws_vpc.vpc.id}"
  tags = {
    "Name"         = "lufi-master-igw"
  } 
}

# Create a public subnet

resource "aws_subnet" "publicsubnet" {
  vpc_id                  = "${aws_vpc.vpc.id}" 
  cidr_block              = "${var.public_subnet_cidr}"
  map_public_ip_on_launch = true
  tags                    = {
      Name                = "lufi-master-us-east-1-public"
  }  
}

# Create routeTable
resource "aws_route_table" "public" {
    vpc_id         = "${aws_vpc.vpc.id}"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.IGW.id}"
    }
             
    tags           = {
      Name         = "lufi-master-us-east-1-public-rt"
 }
}

resource "aws_main_route_table_association" "mainRTB" {
  vpc_id         = "${aws_vpc.vpc.id}"
  route_table_id = "${aws_route_table.public.id}"
}
## Create security group
resource "aws_security_group" "security" {
  name             = "lufi-master-sg"  
  description      = "allow all traffic"
  vpc_id           = "${aws_vpc.vpc.id}"

  ingress  {
    description    =  "allow all traffic"
    from_port      = "0"
    to_port        = "65535"  
    protocol       = "tcp"
    cidr_blocks    = ["0.0.0.0/0"]
  }
  ingress  {
    description    = "allow port SSH"
    from_port      = "22"
    to_port        = "22"
    protocol       = "tcp"
    cidr_blocks    = ["0.0.0.0/0"]
  }
  egress  {
    from_port      = 0
    to_port        = 0
    protocol       = "-1"
    cidr_blocks    = ["0.0.0.0/0"]
  }
  
}

#Create key_pair for the instance

resource "aws_key_pair" "genkey" {
  key_name           = "lufi.webapp"
  public_key         = "${file(var.public_key)}"
}

# Add ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners = ["099720109477"]

    filter {
        name   = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
    }
}

# Craete ec2 instance
resource "aws_instance" "ec2_instance" {
  ami                = "${data.aws_ami.ubuntu.id}"
  instance_type      = "t2.medium"
  associate_public_ip_address = "true"
  subnet_id          = "${aws_subnet.publicsubnet.id}"
  vpc_security_group_ids = ["${aws_security_group.security.id}"]
  user_data          = templatefile("${path.module}/lufi_startup.sh", local.user_data_vars)
  key_name           = "lufi.webapp"
  
  tags               = {
    Name             = "${var.instance_name}"
  }
}
