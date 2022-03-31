output "public_ip" {
  value = "${aws_instance.ec2_instance.public_ip}"
}

output "App_running_at" {
  value = "http://${aws_instance.ec2_instance.public_ip}:8081"
}
