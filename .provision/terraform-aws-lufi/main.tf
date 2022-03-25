#Create the VPC 
resource "aws_vpc" "MAIN" {
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
  vpc_id           = "${aws_vpc.MAIN.id}"
  tags = {
    "Name"         = "lufi-master-igw"
  } 
}

# Create a public subnet

resource "aws_subnet" "publicsubnet" {
  vpc_id                  = "${aws_vpc.MAIN.id}" 
  cidr_block              = "${var.public_subnet_cidr}"
  map_public_ip_on_launch = true
  tags                    = {
      Name                = "lufi-master-us-east-1-public"
  }  
}

# Create routeTable
resource "aws_route_table" "publicroute" {
    vpc_id         = "${aws_vpc.MAIN.id}"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.IGW.id}"
    }
             
    tags           = {
      Name         = "lufi-master-us-east-1-public-rt"
 }
}

resource "aws_main_route_table_association" "mainRTB" {
  vpc_id         = "${aws_vpc.MAIN.id}"
  route_table_id = "${aws_route_table.publicroute.id}"
}
## Create security group
resource "aws_security_group" "security" {
  name             = "lufi-master-sg"  
  description      = "allow all traffic"
  vpc_id           = "${aws_vpc.MAIN.id}"

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

# Craete ec2 instance
resource "aws_instance" "ec2_instance" {
  ami                = "ami-04505e74c0741db8d"
  instance_type      = "t2.medium"
  associate_public_ip_address = "true"
  subnet_id          = "${aws_subnet.publicsubnet.id}"
  vpc_security_group_ids = ["${aws_security_group.security.id}"]
  key_name           = "lufi.webapp"

  connection          {
    agent            = false
    type             = "ssh"
    host             = aws_instance.ec2_instance.public_dns 
    private_key      = "${file(var.private_key)}"
    user             = "${var.user}"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install python3.9 -y",
      ]
  }

  provisioner "local-exec" {
    command = <<EOT
      sleep 120 && \
      > hosts && \
      echo "[Lufi]" | tee -a hosts && \
      echo "${aws_instance.ec2_instance.public_ip} ansible_user=${var.user} ansible_ssh_private_key_file=${var.private_key}" | tee -a hosts && \
      export ANSIBLE_HOST_KEY_CHECKING=False && \
      ansible-playbook -u ${var.user} --private-key ${var.private_key} -i hosts site.yml
    EOT
  }
  
  tags               = {
    Name             = "${var.instance_name}"
  }
}



