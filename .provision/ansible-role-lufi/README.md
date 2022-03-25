Ansible-Role-Lufi
=========
This role installs the and configures Lufi on Debian/Ubuntu servers with nginx web server configuration.

Role Variables
-------------- 
| Variable name | Value | Description |
| ------------- | ----- | ----------- |
| `app_dir` | /var/www/lufi | Set the application directory for the best practice |
| `lufi_owner` | www-data | Set the application user for the best practice |
| `lufi_group` | www-data | Set the application group for the best practice |
| `contact` | contact.example.com | Contact option (mandatory), where you have to put some way for the users to contact you. |
| `report` | report@example.com | report option (mandatory) Put an email address or an URL to let people report illegal files |
| `project_version` | master | We can chose the project version either Master branch, Dev branch or tag based |
| `servername` | IP address (or) CNAME/FQDN | Mention the Server Name for the Nginx configurations |

Sample example of use in a playbook
--------------

The following code has been tested with Ubuntu 20.04

```yaml
 
- name: "install lufi"
  hosts: enter your hosts file
  become: yes
  role:
    - ansible-role-lufi
  vars:
    lufi_owner: "www-data"
    lufi_group: "www-data"
    contact: "contact.example.com"
    report: "report@example.com"
    app_dir: "/var/www/lufi"
    project_version: "master"
    servername: "IP address (or) CNAME/FQDN"
```   

Contributing
------------
Don’t hesitate to create a pull request









