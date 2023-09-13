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
	- Bash scripts (Temperature)

Day 2: Scripting
- NodeJS (Server)
- Repository documentation and markdown syntax
- Git and GitHub (ssh-keys)
- Git repositories (cloning, push and pull)
- Tmux and Vim for developing
- Temperature reading script using Python

Day 3: IoT devices 
- ESP32 IoT device
- Introduction to the ESP32 (Hola Mundo - LED)
- Wi-Fi Access protocols
- Creating a `Mosquitto` (MQTT) server
- ESP32 and Server test (MQTTX)
- Work on your project development (basic development)

Day 4: Examination and project presentations
- Examination (30 minutes)
- A full dashboard for GPIO control, humidity and temperature readings, and ESP32 measurements
- Presentation about embedded systems, programming, and project development 
- Group class picture
- Farewell
---

# Accessing the RPi4 by ssh

The `ssh` protocol can give us access to the SBC if it is enabled (disabled by default at Raspberry). Thus, we need to know the SBC's IP or hostname and own a username with a password. 

By default, the RPi's hostname is `raspberry`, but the username and password are defined during the image creation process by the user [raspberry Pi imager](https://www.raspberrypi.com/software/).*


![Imgur](https://imgur.com/dFG5wRy.jpg)



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
Performing various actions on the command line can be an efficient and rewarding experience. However, newcomers might find the process quite challenging and disorganizing.

That is where Tmux application comes in handy, as it allows splitting a single window into several others. In other words, it enables you to simultaneously perform several tasks on the same screen.

This tutorial will show you how to install and use Tmux. 


## Tmux shortcuts & cheatsheet
start new:

	tmux

start new with session name:

    tmux new -s myname

attach:

    tmux a  #  (or at, or attach)

attach to named:

    tmux a -t myname

list sessions:

    tmux ls

kill session:

    tmux kill-session -t myname

Kill all the tmux sessions:

    tmux ls | grep : | cut -d. -f1 | awk '{print substr($1, 0, length($1)-1)}' | xargs kill

In tmux, hit the prefix `ctrl+b` (my modified prefix is ctrl+a) and then:

## List all shortcuts
To see all the shortcut keys in tmux simply use the `bind-key ?` in my case that would be `CTRL-B ?`

## Sessions

    :new<CR>  new session
    s  list sessions
    $  name session

## Windows (tabs)

    c  create window
    w  list windows
    n  next window
    p  previous window
    f  find window
    ,  name window
    &  kill window

## Panes (splits) 

    %  vertical split
    "  horizontal split
    
    o  swap panes
    q  show pane numbers
    x  kill pane
    +  break pane into window (e.g. to select text by mouse to copy)
    -  restore pane from window
    ⍽  space - toggle between layouts
    <prefix> q (Show pane numbers, when the numbers show up type the key to goto that pane)
    <prefix> { (Move the current pane left)
    <prefix> } (Move the current pane right)
    <prefix> z toggle pane zoom

---

# Temperature reading script using Python
Use the next code:
```
#! /usr/bin/python

TEMP_PATH="/sys/class/thermal/thermal_zone0/"

fo = open(TEMP_PATH + "temp","r")
temp=fo.read()
print(temp)
```

Then, run the script by calling `python main.py`

**Create a Python code to call temperature readings, compute the average temperature, and import both functions from an Interactive Python shell example.**

---

# NodeJS

## Introduction to Node.js
Node.js is a platform for building network applications. Nodejs uses the same JavaScript engine as the Google Chrome web browser, and JavaScript is the programming language that is often used to create interactive interfaces within web pages.   

Thus, Node.js is a runtime environment and library that allows running JavaScript on the server-side, without the need for a browser, directly at the Linux shell prompt.

Node.js uses an event-driven, non-blocking input/output model. Event-driven programming is commonplace in user-interface programming. It essentially means that the program’s flow of execution is driven by user actions or messages that are transferred from other threads or processes. Interestingly, the fact that it uses nonblocking I/O means that it is suitable for interfacing with the input/output pins on your board, safely sharing resources with other applications.

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
console.log("Hello World !!!");
```


   ---
   
# Day 3: IoT devices 
# ESP32 IoT device

## Introduction
This section shows the basic usage of the Arduino IDE with the ESP32 development board by implementing a blinking LED and serial communication project.

## Programming the ESP32 Board
For this example, we will use the **ESP32-C3-WROOM-02**. Below, you can see the pinout layout.

![](https://mischianti.org/wp-content/uploads/2023/04/ESP32-C3-DevKitC-02-pinout-high.png)



then, we need to install the Arduino IDE to program the ESP32.

## Installing the Arduino IDE

The Arduino IDE 2.1.1 can be installed on *Windows, MacOS, or GNU Linux*. The Windows installation is commonly done using an installer. In the case of the *GNU Linux*, it is highly recommended to use the distribution's package manager. In my case, the ArchLinux manager is *pacman*, thus use:

```
sudo pacman -Sy arduino
[sudo] password for gmarx:
:: Synchronizing package databases...
 core                                 157.9 KiB   235 KiB/s 00:01 [####################################] 100%
 extra                               1710.6 KiB  3.66 MiB/s 00:00 [####################################] 100%
 community                              6.7 MiB  7.49 MiB/s 00:01 [####################################] 100%
warning: arduino-1:1.8.19-1 is up to date -- reinstalling
resolving dependencies...
looking for conflicting packages...

Packages (1) arduino-1:1.8.19-1

Total Installed Size:  59.36 MiB
Net Upgrade Size:       0.00 MiB

:: Proceed with installation? [Y/n]
```


## Adding the ESP32 Boards
The addition of the ESP32 boards requires installing the ESP32 boards on Arduino IDE by `Tools -> Board -> Boards Manager ...` and writing `ESP32` to list the tools required to work with:
![](https://imgur.com/3n7YJWL.png)

## ESP32 Hello World
Before programming the ESP32 board, we must select the proper board in the `Board` tool. Thus, again open and select the `Tools -> Bord -> ESP32C3 Dev Module`. Then, paste the next code section to test the ESP32 board:

![](https://imgur.com/zTzcuOg.png)

```c
/*
 *
 * Example code for ESP32-S:
 * The code blinks the onboard LED (at D2 in GPIO 02) every 0.500 seconds.
 * The code also prints by serial communcation the word "Hello" during the
 * ON stage of the LED, and then prints "World" during the OFF.
 * Gerardo Marx 19/Jul/2023
 */

// this variable is defined in pins_arduino.h for DOIT ESP32 DEVKIT-02
// int LED_BUILTIN = 02;
int LED_ONBOARD = 02;

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BUILTIN, OUTPUT);
  //serial  monitor setup
  Serial.begin(115200);
      }

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print("ON");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  // after delay
  Serial.print(" - OFF\n");
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

Next, compile and upload the code generated into the board.

# Wi-Fi Access protocols
```c
#include <WiFi.h>
 
// Replace with your own network credentials
const char* ssid = "u-boot";
const char* password = "faow64rgoqazef";
 
void setup(){
 
    Serial.begin(115200);
 
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting to WiFi Network ..");
 
    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(500);
    }
 
    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}
 
void loop(){
    // Do Nothing
}
```

# Creating a `Mosquitto` (MQTT) server

## Introduction
This repository includes the basic information to mount a server using **Node-RED** as a Dashboard and also working as an MQTT server using **Mosquitto**. The MQTT server is tested with an ESP32 client to publish random numbers every two seconds.

The general scheme is shown below, the complete environment requires a client, MQTT server or broker, and an MQTT client that works like a user interface (dashboard).

The basic communication scheme could work like this:  

1. The ESP32 starts the communication chain by sending a text message to the broker. The broker can be public or local.

2. Depending on the code, the sending message can be replicated to all the connected clients in the *topic*.

3. Finally, a web server based on *Node-RED* will read the data in the broker to be displayed in the *User Interface*.


![mqttesp32](https://github.com/ss-jade/mqtt-server-raspberry/blob/main/Imagenes/mqttesp32.PNG?raw=true)


## Installing Mosquitto

For the Raspberry Pi, based on Debian's distribution, we can use the following code:

```bash
sudo apt update
sudo apt upgrade
sudo apt install mosquitto
```

To execute *mosquitto* and enable it every time the system starts:

```
sudo systemctl enable mosquitto.service
```

## Configuring the Mosquitto server

First, replace the default configuration file with the file provided in this repository:

```
sudo cp ./mosquitto.conf /etc/mosquitto/mosquitto.conf
```

The file content is:
```
persistence true
listener 1883
persistence_location /var/lib/mosquitto/
connection_messages true
allow_anonymous true
password_file /etc/mosquitto/passwd
```

then, create the password file instanced on the `mosquitto.conf` file

```
sudo touch /etc/mosquitto/passwd
```
finally, restart the service:

    sudo systemctl restart mosquitto

## Node-RED installation
To install **nodejs** write in terminal:
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

Then, let us install the *Node-RED* app and the *Dashboard* complement by using the *Node Package Manager*:

```
npm install node-red
npm install node-red-dashboard
```
Now, we require to run in the background the app and verify that *node-RED* is running:
```
node-red &
sudo netstat -plnt
```
then, to get access to *node-RED* go to your web browser at `rasp-hostname.local:1880` or `rasp-ip:18080`.

## A flow process in Node-RED
A basic process is implemented on *Node-RED* to test the mqtt protocol. Thus, add the next blocks:

1. `mqtt in` from network group
2. `debug` from common
3. `chart` from dashboard

Click on *Add new mqtt-brocker*, then, in the *Connection* tab, set *Name* to Rasp, point the server to the Raspberry's IP or hostname and port 1883. Leave unchanged the *Security* and *Message* tabs and click on the **Add** button. 

Finally, set the topic to `data/esp32` and the output to `String` in the mqtt properties' node:

Next, click on the `Deploy` button to check if the process can connect to the Broker:
![](./deploy.png) 

Visit the `hostname-or-ip/ui` to see the output generated by the MQTT client.

**Note: You can also check the generated data on the Arduino IDE serial tools.**

---

# ESP32 and Server test (MQTTX)
In this project, we will connect ESP32 to a free public MQTT server operated and maintained by EMQX MQTT Cloud. Thus, we will use the Arduino IDE to program the ESP32. EMQX Cloud is a secure MQTT IoT cloud service platform launched by EMQ. It provides MQTT 5.0 access service with one-stop operation and maintenance management and a unique isolation environment.

![](https://assets.emqx.com/images/d6265585d6257fc02c722fe45888bdac.png?imageMogr2/thumbnail/1520x)

First, install the `PubSubClient` library with `Project -> Load library -> Library manager... -> Search PubSubClient -> Install PubSubClient by Nick O’Leary`

![](https://assets.emqx.com/images/cb7b0228aa91bf300eec5a725da159d3.png?imageMogr2/thumbnail/1520x)

```c
// Summer School 2023
// ESP32 test code for MQTT protocol
// Gerardo Marx

#include <WiFi.h>
#include <PubSubClient.h>

// WiFi configuration
const char *ssid = "u-boot"; // WiFi name
const char *password = "faow64rgoqazef";  // WiFi password
WiFiClient espClient;

// mqtt brocker config:
const char *mqttBrocker = "broker.emqx.io";
const char *topic = "esp32/test";
const char *mqttUsername = "emqx";
const char *mqttPassword = "public";
const int mqttPort = 1883;
PubSubClient client(espClient);


void setup(){
  //serial communication
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print("Connecting to ");
    Serial.println(ssid); 
  }
  Serial.println("Connection done.");
  //connecting to a mqtt brocker:
  client.setServer(mqttBrocker, mqttPort);
  client.setCallback(callback);
  while(!client.connected()){
    String clientID = "esp32-gmarx-";
    clientID += String(WiFi.macAddress());
    Serial.printf("The %s tries to connect to mqtt borcker...\n",clientID.c_str());
    if(client.connect(clientID.c_str(), mqttUsername, mqttPassword)){
      Serial.println("mqtt brocker connected");
    }
    else {
      Serial.print("mqtt connection failed");
      Serial.println(client.state());
      delay(2000);
    }
  }
  //once connected publish and suscribe:
  client.publish(topic, "Hi EMQX broker I'm a ESP32 at Jade-HS:)");
  client.subscribe(topic);
}

void loop(){
  client.loop();
}

void callback(char *topic, byte *payload, unsigned int length){
  Serial.print("Message recived in topic: ");
  Serial.println(topic);
  Serial.print("The message is: ");
  for(int i=0;i<length; i++){
    Serial.print((char) payload[i]);
  }
  Serial.println();
  Serial.println("-+-+-+End+-+-+-+");
}
```

# Work on your project development (basic development)

```
void loop(){  
  client.loop();
  char str[16];
  sprintf(str, "%u", 33+random(1));
  client.publish("esp32/test", str);
  Serial.println(str);
  delay(2000);
}
```

# Day 4: Examination and project presentations

- [Examination](https://docs.google.com/forms/d/e/1FAIpQLSdhd5HpaSMVm6rtpBq1mmi6V4d-Sda5Cp-Xea2w8i9B-g6WkA/viewform?usp=sf_link)
- A full dashboard for GPIO control, humidity and temperature readings, and ESP32 measurements
- Presentation about embedded systems, programming, and project development 
- [Feedback from students](https://docs.google.com/forms/d/e/1FAIpQLSc8JfLrkZ7F45bnKkYhjfrcDCHwme3CZPVzi5aIqzAj13JLlQ/viewform?usp=sf_link)
- Group class picture
- Farewell




