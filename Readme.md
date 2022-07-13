# Readme 
This repository is developed to cover the embedded systems lecture at summer school in Jade University. 

# Issues to solve 
- [ ] TODO which version of beagles to buy
- [ ] I prefer to use the beaglebone black wi-fi, if it is possible to connect them to Jade's internet
- [ ] Otherwise the ethernet version is preferred to use with usb-internet sharing
- [ ] Install in computer the PuTTY software and some bash option to use. 
- [ ] TODO Adding to day 1: https://linuxpropaganda.wordpress.com/2018/06/26/create-new-user-in-ubuntu-on-beaglebone-black/     

# day-1: Introduction to the single-board computers (SBC) and basic applications
## Basic connections 
### Basic USB connection for Beagle
To connect into the SBC, attach the USB cable into the PC. Then, open the terminal and type:
```
$ ip addr
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	ether bc:d0:74:35:a9:39
	inet6 fe80::416:aee8:9fce:7def/64 secured scopeid 0xe
	inet 192.168.6.2/24 brd 192.168.1.255 en0
	inet6 2806:2f0:5040:8572:189b:329e:6e92:ec98/64 autoconf secured
	inet6 2806:2f0:5040:8572:796d:4680:2f61:a858/64 autoconf temporary
```
you will obtain a lot of `enX` or `awdlx` devices, try to search for the new detected devices and specially the one with the ip 192.168.6.2 or 192.168.7.2 that belongs to the BeagleBone devices.

### TODO Basic USB connection for Raspberry Pi 4(RPi4)
### TODO Enabling the SSH in the RPi4

- Connect to a IP address
- SSH connection 

```
ssh -X debian@192.168.7.2
debian:temppwd
```
### Error connection 
When getting the error:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
The ECDSA host key for beaglebone.local has changed,
and the key for the corresponding IP address 2806:103e:5:50f4:3ad2:69ff:fef9:46b4
```
you have to edit the '.ssh/known_hosts' file, and delete the lien  that contains the offending key and the corresponding IP address given the warning. 

### Sharing the internet through usb 
### Wi-Fi
To connect to your Wireless network type the following command in the terminal window:

```bash
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
```



## Basic configuration

### Changing the beaglebone's hostname
First edit the `/etc/hostname` file by:

```
sudo vim /etc/hostanme
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
change the second line in both `hostname` instances for your new hostanme (must be the same previously defined).  

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

### Updating the system
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

now we can start to install updated packages, lets try to install the `ntp` package to synchronise the clocks of computer that we will use later:
```
$ sudo apt install  ntp
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  libevent-core-2.1-6 libevent-pthreads-2.1-6 libopts25 sntp
  Suggested packages:
    ntp-doc
	The following NEW packages will be installed:
	  libevent-core-2.1-6 libevent-pthreads-2.1-6 libopts25 ntp sntp
	  0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.
	  Need to get 1092 kB of archives.
	  After this operation, 2294 kB of additional disk space will be used.
	  Do you want to continue? [Y/n] Y
	  .
	  .
	  .
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

### SSH Key pairs
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

### Oh My Bash
Next, to make easy work with the bash system let us install the oh-my-bash tool:
```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"
```
you can go deeper and customize the themes and plugins at [oh-my-bash](https://ohmybash.nntoan.com/)
