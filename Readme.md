# Introduction

This repository has been developed to cover the embedded systems lecture at the **International Summer School 2023 at Jade University**. The repository will guide us along several topics until we develop a final project. 

The main objective is to become familiar with the Raspberry Pi (RPi) Single Board Computer (SBC) by learning different methods of programming the device and getting access to the hardware available by the next general syllabus: 

Day 1: Introduction
- Lecture's introduction
- Students' background presentation
- SSH connection with Power Shell (Windows OS)
- Exploring the OS and Bash commands
- Raspberry basic configuration
	- `apt update`
	- `hostname` and `passwd` 
	- `ip adds`
- Installing applications
	- Vim (configuration and commands)

Day 2: Scripting
- Bash scripts (Temperature)
- Repository documentation and markdown syntax
- Git and GitHub (ssh-keys)
- Git repositories (cloning, push and pull)
- Tmux and Vim for developing
- Temperature reading script using Python
- NodeJS

Day 3: Sense hat and GPIO
- Introduction to Sense-Hat
- Temperature readings from sense-hat
- Matrix colors
- RED-Node installation
- GPIO basic application
- Dashboard readings

Day 4: Project developing/presentation
- A full dashboard for GPIO control, humidity and temperature readings, IMU readings, and LED-RGB matrix control
- Presentation about embedded systems, programming, and project development 

---

# Accessing the RPi4 by ssh

The `ssh` protocol can give us access to the SBC if it is enabled (disabled by default at Raspberry). Thus, we need to know the SBC's IP or hostname and own a username with a password. 

By default, the RPi's hostname is `raspberry`, but the username and password are defined during the image creation process by the user [raspberry Pi imager](https://www.raspberrypi.com/software/).*


![](https://imgur.com/dFG5wRy)

Then, to make ssh, use:
```
$ ssh username@hostname.local  
```
or 
```
$ ssh username@ip
```


# Basic commands on the Bash 

Next are listed the most common commands on the bash-shell:

- `ls` list files in the current path
- `touch` creates a file in the current path
- `rm` removes a file or folder (requires arguments)
- `mkdir` creates a folder in the current path (requires arguments)
- `cd` change directory (requires arguments)
- `cp` copy file/folder (requires arguments)

**--Let us practice the commands on the bash terminal--**


# RPi4 configuration

Once you can connect or get into the SBC, a basic configuration and package installation is required. The next sections will guide you to install Vim, configure the SBC's hostname, the user password, internet access and time, and finally install a useful bash tool.

## Updating the system and installing Vim

Before any further changes, please update the system and packages by:

```
$ sudo apt update
$ sudo apt list --upgradable
```
and then make the upgrade of all required packages
```
$ sudo apt upgrade
Reading package lists... Done
....
	Need to get 9908 kB of archives.
	After this operation, 69.6 kB of additional disk space will be used.
	Do you want to continue? [Y/n] Y
	...
	...
	...
```

## Special cases

Sometimes, the Debian OS needs to be configured for time zones and locales:
```
sudo dpkg-reconfigure locales
sudo dpkg-reconfigure tzdata
sudo date -s "6 Sep 2023 13:49:00" 
``` 

## Time and Internet access
We previously checked the internet access to our SBC devices, now, let us use the internet to sync our time zone and locales for the further sync of commits in the git system. 

Thus, let us check the time at the device by:
```
$ date
$ systemctl status time-sync.target
```
if the time is wrong, use the next command and follow the instructions:
```
$ sudo dpkg-reconfigure tzdata
```
then the system will have the correct time now.

If locale settings fail, use:
```
$ sudo dpkg-reconfigure locales
```
and choose your desired locales; it is recommended to use international English with UTF-8 compatibility.
---
Now, we can start to install updated packages. Let us install the `Vim` application to use as our main source and text editor:
```
$ sudo apt install vim
```

## Vim editor and commands

Vim has two modes.

1. Insert mode (Where you can just type like normal text editor. Press `i` for insert mode)

2. Command mode (Where you give commands to the editor to get things done. Press `ESC` for command mode)

The most basic Vim commands are:

- `:e myfile`	Opens “myfile” for editing
- `:w`	Save the file
- `:sav myfile.txt`	Saves the file as myfile.txt
- `:x`	Write changes to file and exit
- `:q!`	Quit without saving changes
- `:q`	Quit Vim

## Vim basic configuration file
Vim can be configured to highlight syntax and for more advanced settings (`~/.vimrc`):
```
" ------------------
"         __
" .--.--.|__|.--------.----.----.
" |  |  ||  ||        |   _|  __|
"  \___/ |__||__|__|__|__| |____|
" ------------------
"
" Basic settings
" --------------
set nocompatible
filetype plugin indent on
syntax enable

set number relativenumber
set path+=**
set wildmode=longest,list,full
set encoding=UTF-8
set cursorline
set showmatch   " matching brackets
set linebreak
set ignorecase  " case insensitive matching
set smartcase   " smart case matching
"set clipboard+=unnamedplus
set mouse=a
set tabstop=4
set shiftwidth=4
set softtabstop=4
set spelllang=en_us
set showtabline=2
set laststatus=2
set backspace=indent,eol,start  " more powerful backspacing
" ------------------
" Basic styling
" ------------------
highlight Comment cterm=italic
highlight CursorLine ctermbg=Black cterm=NONE
highlight CursorLineNr ctermbg=Black cterm=bold ctermfg=Green
highlight LineNr ctermbg=Black ctermfg=White
```

## Changing the RPi4's hostname

First, edit the `/etc/hostname` file by:
```
$ sudo vim /etc/hostname
```

Change the first and only line in this file to reflect your new hostname. 

Then, edit the `/etc/hosts` file:
```
127.0.0.1       localhost
127.0.1.1       hostname.localdomain    hostname

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```
change the second line in both `hostname` instances (127.0.1.1) for your new hostname; must be the same as previously defined.  

Finally, reboot your device.

## Changing the user's password

To change the logged-in user's password, use the following:
```
$ passwd
Changing password for debian.
Current password: temppwd
New password: xxxxxxx
```


## Oh My Bash tool

Next, to make easier work with the bash system, let us install the oh-my-bash tool:
```
$ bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"
```
you can go deeper and customize the themes and plugins at [oh-my-bash web page](https://ohmybash.nntoan.com/).


# Bash scripting

[Example](https://github.com/ss-jade/temp-bash-example)
```
#! /bin/bash

TEMP_PATH=/sys/class/thermal/thermal_zone0/temp

function printTemp
{
	cat $TEMP_PATH
}

	printTemp
```

# Markdown syntax
Markdown is an extensive syntax used for repositories' basic documentation. A basic [cheatsheet can be checked here.](https://paperhive.org/help/markdown)

# Github
1. Create an account in [Github](https://github.com)
2. Create ssh-key pairs in the RPi4 and save the `*.pub` content at [SSH keys](https://github.com/settings/keys)
3. Create a remote repository and follow the instructions to upload your local copy
4. Check the remote repository

## SSH Key pairs for Github (~~optional~~)

To create key pairs for SSH, use:
```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```
then copy the `*.pub` file generated with:
```
$ ssh-copy-id -i ~/.ssh/id_ed25519.pub debian@bbb-marx.local
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/gmarx/.ssh/id_ed25519.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed ...
```

---

## Git configuration
In 2005, *Linus Torvalds* created Git, a version-controlling system specifically for developing the Linux Kernel.

Let us start by specifying the Git configuration settings with the `git config` command. Thus, one of the first things you need is to set up your name and email address:
```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
also, you can set the main editor or client to commit:
```
git config --global core.editor vim
```

Now, try to create a new repository with two files: file-a and file-b. Add some lines of code, and make a commit. Next, make some changes, and only commit the changes on file-a. The changes on file-b restore them to the previous commit.


# Tmux and Vim for developing
# Temperature reading script using Python
# NodeJS

## Introduction to Node.js
Node.js is a platform for building network applications that uses the same  JavaScript engine as the Google Chrome web browser. JavaScript is the programming language that is often used to create interactive interfaces within web pages.   Node.js is a runtime environment and library that allows running JavaScript on the server-side, without the need for a browser, directly at the Linux shell prompt.

Node.js uses an event-driven, nonblocking input/output model. Event-driven   programming is commonplace in user-interface programming. It essentially   means that the program’s flow of execution is driven by user actions or messages   that are transferred from other threads or processes. Interestingly, the fact that   it uses nonblocking I/O means that it is suitable for interfacing to the input/output pins on your board, safely sharing resources with other applications.

## Installing nodejs and npm 

```
sudo su
curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
```

```
sudo apt install nodejs
```
## Hello world

```
console.log("Hello web!!!");
```


   ---
   
# Day 3

# Day 4


