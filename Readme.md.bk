# Introduction
This repository is developed to cover the embedded systems lecture at summer school in Jade University. 

# Part-1: Introduction to IoT systems and single-board computers (SBC) 
## Accessing to SBCs by USB

To connect into the SBC, attach the USB cable into the PC. Then, open the terminal and type:
```
$ ip addr
...
...
en10: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	ether f4:5e:ab:50:44:89
	inet6 fe80::10a6:8287:252f:1a43/64 secured scopeid 0x16
	inet 192.168.6.1/24 brd 192.168.6.255 en10
...	
```
you will obtain a lot of `enX` or `awdlx` devices, try to search for the new detected devices and specially the one with the ip 192.168.6.1 or 192.168.7.1 that belongs to the BeagleBone devices, and XXX for the Raspberry Pi.

Then, use the `SSH` protocol, from now ssh, to access the board computer (please change the ip address by your ip device)
```
$ ssh debian@192.168.6.2
Debian GNU/Linux 10

BeagleBoard.org Debian Buster IoT Image 2022-07-01
Support: https://bbb.io/debian
default username:password is [debian:temppwd]


The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Thu Jul  7 07:08:40 2022 from 2806:2f0:5040:8572:7d51:e754:675:cd2a
```


## Accessing the RPi4 by ssh

The SBCs can be accessed by ssh protocol if it is enable (disable by default at raspberry). Thus, we only need to know the SBC's ip or hostname. By default the raspberry Pi 4 is `raspberry`, but username and password is defined by the user ([raspberry Pi imager](link)). Then, to make `ssh` use:
```
$ ssh username@hostname.local  
```
or 
```
$ ssh username@ip
```

## Error connection 
When getting the error:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
The ECDSA host key for beaglebone.local has changed,
and the key for the corresponding IP address 2806:103e:5:50f4:3ad2:69ff:fef9:46b4
```
you have to edit the '.ssh/known_hosts' file, and delete the lien  that contains the offending key and the corresponding IP address given the warning. 

## Basic configuration
Once you are able to connect or get in into the SBC, a basic configuration and package installation is required. The next section will guide you install Vim, the SBC's hostname, the user password, internet access and time, and finally to install a useful bash tool.
### Updating the system and installing VIM

Before any further change, please update the system and packages by:

```
$ sudo apt update
[sudo] password for debian:
Hit:1 http://deb.debian.org/debian buster InRelease
Hit:2 http://deb.debian.org/debian buster-updates InRelease
Hit:3 http://security.debian.org/debian-security buster/updates InRelease
Hit:4 http://repos.rcn-ee.com/debian buster InRelease
Reading package lists... Done
Building dependency tree
Reading state information... Done
17 packages can be upgraded. Run 'apt list --upgradable' to see them.
$ sudo apt list --upgradable
Listing... Done
bb-customizations/unknown 1.20220705.6-0~buster+20220705 all [upgradable from: 1.20220513.0-0~buster+20220513]
bbb.io-kernel-4.19-ti/unknown 1.20220705.0-0~buster+20220705 all [upgradable from: 1.20220628.0-0~buster+20220628]
bbb.io-kernel-tasks/unknown 1.20220705.0-0~buster+20220705 all [upgradable from: 1.20220628.0-0~buster+20220628]
dirmngr/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gnupg-l10n/oldstable 2.2.12-1+deb10u2 all [upgradable from: 2.2.12-1+deb10u1]
gnupg-utils/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gnupg/oldstable 2.2.12-1+deb10u2 all [upgradable from: 2.2.12-1+deb10u1]
gpg-agent/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpg-wks-client/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpg-wks-server/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpg/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpgconf/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpgsm/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
gpgv/oldstable 2.2.12-1+deb10u2 armhf [upgradable from: 2.2.12-1+deb10u1]
libcpupower1/oldstable 4.19.249-2 armhf [upgradable from: 4.19.235-1]
linux-cpupower/oldstable 4.19.249-2 armhf [upgradable from: 4.19.235-1]
linux-libc-dev/oldstable 4.19.249-2 armhf [upgradable from: 4.19.235-1]
```
and then, make the upgrade of all required packages
```
$ sudo apt upgrade
Reading package lists... Done
Building dependency tree
Reading state information... Done
Calculating upgrade... Done
The following packages will be upgraded:
  bb-customizations bbb.io-kernel-4.19-ti bbb.io-kernel-tasks dirmngr gnupg gnupg-l10n gnupg-utils gpg gpg-agent
    gpg-wks-client gpg-wks-server gpgconf gpgsm gpgv libcpupower1 linux-cpupower linux-libc-dev
	17 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
	Need to get 9908 kB of archives.
	After this operation, 69.6 kB of additional disk space will be used.
	Do you want to continue? [Y/n] Y
	...
	...
	...
```

now we can start to install updated packages, lets try to install the `VIM` package to use as our main source and text editor:

```
$ sudo apt install vim
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  libgpm2 vim-runtime
Suggested packages:
  gpm ctags vim-doc vim-scripts
The following NEW packages will be installed:
  libgpm2 vim vim-runtime
0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.
Need to get 7650 kB of archives.
After this operation, 36.4 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://deb.debian.org/debian bullseye/main arm64 libgpm2 arm64 1.20.7-8 [35.9 kB]
Get:2 http://deb.debian.org/debian bullseye/main arm64 vim-runtime all 2:8.2.2434-3+deb11u1 [6226 kB]
Get:3 http://deb.debian.org/debian bullseye/main arm64 vim arm64 2:8.2.2434-3+deb11u1 [1388 kB]
Fetched 7650 kB in 0s (17.0 MB/s)
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
LANGUAGE = (unset),
LC_ALL = (unset),
LC_CTYPE = "UTF-8",
LANG = "en_GB.UTF-8"
are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_GB.UTF-8").
	  .
	  .
	  .
```

### Changing the bb's or rpi4's  hostname
First edit the `/etc/hostname` file by:

```
$ sudo vim /etc/hostname
```

change the first and only line in this file to reflect your new hostname. 

Then, edit the `/etc/hosts` file:
```
127.0.0.1       localhost
127.0.1.1       hostname.localdomain    hostname

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```
change the second line in both `hostname` (127.0.1.1)  instances for your new hostanme (must be the same previously defined).  

Finally, reboot your beagle or raspberry device.

### Changing the user's password

To change the default user's password use:
```
$ passwd
Changing password for debian.
Current password: temppwd
New password: xxxxxxx
...
```

### Time and internet access
We previously have checked the internet access to our SBC-devices, now, let us use the internet to sync our time zone and locales for the further sync of commits in the git system. Thus, let us check the time at the device by:
```
$ systemctl status time-sync.target
time-sync.target - System Time Synchronized
	Loaded: loaded (/lib/systemd/system/time-sync.target; static; vendor preset: enabled)
	Active: active since Wed 2022-07-06 22:06:43 CDT; 14min ago
	Docs: man:systemd.special(7)
```
if time is wrong use the next command and follow the instructions:
```
$ sudo dpkg-reconfigure tzdata
```
the, the system will have the correct time now.

If locale settings fail use:
```
$ sudo dpkg-reconfigure locales
```
and choose your desired locales, it is recommended to use international english with UTF-8 compatibility.

### Oh My Bash

Next, to make easier work with the bash system let us install the oh-my-bash tool:
```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"
```
you can go deeper and customize the themes and plugins at [oh-my-bash](https://ohmybash.nntoan.com/)

## SSH Key pairs
To create key pairs use:
```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
...
...
...
```
then copy the `*.pub` file generated:
```
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub debian@bbb-marx.local
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/gmarx/.ssh/id_ed25519.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
Debian GNU/Linux 10

BeagleBoard.org Debian Buster IoT Image 2022-07-01
Support: https://bbb.io/debian
default username:password is [debian:temppwd]

debian@bbb-marx.local's password:

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'debian@bbb-marx.local'"
and check to make sure that only the key(s) you wanted were added.
```

# Starting with the ESP32
The next section will introduce the basics of programming the ESP32 with the Arduino IDE. The first codes allow us to use the GPIOs, serial communication, Wi-Fi, and finally the MQTT protocol. 
