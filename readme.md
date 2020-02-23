Issues to solve
===============

which version of beagles to buy
-------------------------------

-   I prefer to use the beaglebone black wi-fi, if it is possible to
    connect them to Jade\'s internet
-   Otherwise the ethernet version is preferred to use with usb-internet
    sharing
-   Install in computer the PuTTY software and some bash option to use.

day-1: Introduction to the beagle-boards and basic applications
===============================================================

Introduction to the beagle boards.
----------------------------------

### Connection

-   Basic USB connection
-   Connect to a IP address
-   SSH connection

ssh -X debian\@192.168.7.2 debian:temppwd

### Sharing the internet through usb

### Wi-Fi

To connect to your Wireless network type the following command in the
terminal window:

    $sudo connmanctl
    connmanctl> enable wifi
    Enabled wifi
    connmanctl> scan wifi
    Scan completed for wifi
    connmanctl> services
    wifi_506583d4fc5e_544e434150413937414239_managed_psk
    connmanctl> agent on
    Agent registered
    connmanctl> connect wifi_506583d4fc5e_544e434150413937414239_managed_psk
    Passphrase? xxxxxxxxxxx
    connected wifi_506583d4fc5e_544e434150413937414239_managed_psk
    connmanctl> quit
    $ping www.google.com

### Basic File System Commands

  Name                Command   options                                 example
  ------------------- --------- --------------------------------------- ----------------------------------
  List files          ls        -a shows all                            ls -la
                                -l long format                          
                                -R recursive                            
  Current directory   pwd       -P prints the physical location         pwd
  Change              cd        .. takes you up a level                 cd /home/gmarx
  directory                     \~ takes you to home directory          cd \~
  Make                mkdir     -p make parent directories as needed    mkdir -p test/example
  directory                     -v print a message for each directory   mkdir -p /test/example
                                                                        \*first example creates
                                                                        folders inside the
                                                                        current folder, other one
                                                                        creates folder in root directory
                                                                        

### Terminal

  Command   Description
  --------- ------------------------
  CTRL-c    Stop current command
  CTRL-z    Sleep program
  CTRL-a    Go to start of line
  CTRL-e    Go to end of line
  CTRL-u    Cut from start of line
  CTRL-k    Cut to end of line
  CTRL-r    Search history
            

!!

Repeat last command

Beagle software
---------------

Developing applications
-----------------------

The linux file system and commands
----------------------------------

day-2: Control versions and interfacing electronics
===================================================

git for control version2
------------------------

C and C++
---------

GPIO interfacing
----------------

4. Bone scripts
---------------

UART communication
------------------

day-3: The internet of things
=============================

A beagle board IoT sensor
-------------------------

Sensor web server
-----------------

Linux cron scheduler
--------------------

QT rich user interface
----------------------

day-4: The project
==================

project development
-------------------
