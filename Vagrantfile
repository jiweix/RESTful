# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.11"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "512"
    vb.cpus = 1
  end

  # Copy your .gitconfig file so that your git credentials are correct
  if File.exists?(File.expand_path("~/.gitconfig"))
    config.vm.provision "file", source: "~/.gitconfig", destination: "~/.gitconfig"
  end

  ######################################################################
  # Setup a Python development environment
  ######################################################################
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    cd ~
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential
    sudo apt-get -y autoremove
    sudo npm install -g forever
    sudo ln -s "$(which nodejs)" /usr/bin/node
    # Install the Cloud Foundry CLI
    # wget -O cf-cli-installer_6.24.0_x86-64.deb 'https://cli.run.pivotal.io/stable?release=debian64&version=6.24.0&source=github-rel'
    # sudo dpkg -i cf-cli-installer_6.24.0_x86-64.deb
    # rm cf-cli-installer_6.24.0_x86-64.deb
    # Install app dependencies
    cd /vagrant
    npm install
  SHELL


  ######################################################################
  # Add MongoDB docker container
  ######################################################################
  #config.vm.provision "shell", inline: <<-SHELL
    # Prepare mongoDB data share
  #  sudo mkdir -p /var/lib/mongo/data
  #  sudo chown vagrant:vagrant /var/lib/mongo/data
  #SHELL

  # Add mongoDB docker container
  #config.vm.provision "docker" do |d|
  #  d.pull_images "mongo"
  #  d.run "mongo",
  #    args: "--restart=always -d --name mongo -h mongo -v '/var/lib/mongo/data:/data/db' -p '27017:27017'"
  #end

  # initialize the mongoDB user 
  #config.vm.provision "shell", inline: <<-SHELL
  #  cd /vagrant
  #  sudo docker cp create_mongo_admin.js mongo:/create_mongo_admin.js
  #  sudo docker exec mongo mongo admin create_mongo_admin.js
  #  sudo docker cp create_mongo_user.js mongo:/create_mongo_user.js
  #  sudo docker exec mongo mongo admin create_mongo_user.js -u user1 -p yourpassword --authenticationDatabase admin
  #SHELL
end

# to test if docker mongo is working: 
# docker run -it --rm --link mongo:mongo mongo mongo -u user -p user mongo/admin