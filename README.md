# RAMEN RESTful API with MongoDB, Express and NodeJS

[![Build Status](https://travis-ci.org/jiweix/RESTful.svg?branch=master)](https://travis-ci.org/jiweix/RESTful)

Demostration of building restful API with devops techniques. This demo assumes you have a running mongoDB instance. You could uncomment the mongodb docker configuration in vagrantfile, but I would encourage you to get a free [mlab](https://mlab.com/) account. Mlab offer 500MB MongoDB database for free, and it's very easy to configure.  

Current running on [Bluemix](https://nyu-cs-app-jx.mybluemix.net/applications) as container.

## Prerequisite Installation using Vagrant

The easiest way to use this code is with Vagrant and VirtualBox.

Download [VirtualBox](https://www.virtualbox.org/)

Download [Vagrant](https://www.vagrantup.com/)

Clone the project to your development folder and create your Vagrant vm

    $ git clone https://github.com/jiweix/RESTful.git
    $ cd RESTful
    $ vagrant up

Before running the app, you should add your mongodb credentials into ./mongodb/key.json in the following format

    {
      "mongoHost": "localhost",
      "mongoPort": "27018",
      "mongoDatabase": "mydb",
      "mongoUser": "user",
      "mongoPass": "password"
    }

Once the VM is up you can use it with:

    $ vagrant ssh
    $ cd /vagrant
    $ npm start

For testing, mocha and chai is used. The following command would run the test.js.

    $ npm test

To get code coverage, istanbul is used.

    $ npm run-script coverage

When you are done, you can use `Ctrl+C` to stop the server and then exit and shut down the vm with:

    $ exit
    $ vagrant halt

If the VM is no longer needed you can remove it with:

    $ vagrant destroy

You can also build a docker image from the Dockerfile inside VM

    $ docker build -t myapp .

This will create the docker image. To run it inside the VM,

    $ docker run -d --rm -p 8080:8080 myapp
