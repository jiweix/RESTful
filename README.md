# RAMEN RESTful API with MongoDB, Express and NodeJS

Demostration of building restful API with devops techniques 

## Prerequisite Installation using Vagrant

The easiest way to use this code is with Vagrant and VirtualBox. 

Download [VirtualBox](https://www.virtualbox.org/)

Download [Vagrant](https://www.vagrantup.com/)

Clone the project to your development folder and create your Vagrant vm

    $ git clone https://github.com/jiweix/RESTful.git
    $ cd RESTful
    $ vagrant up

Once the VM is up you can use it with:

    $ vagrant ssh
    $ cd /vagrant
    $ npm start

When you are done, you can use `Ctrl+C` to stop the server and then exit and shut down the vm with:

    $ exit
    $ vagrant halt

If the VM is no longer needed you can remove it with:

    $ vagrant destroy

