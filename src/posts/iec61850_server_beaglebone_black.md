---
title: IEC61850 server with Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-15
---
# IEC61850 server with a Beaglebone Black

## IEC61850 Server
We will cross-compile the server file using a Ubuntu 17.10 machine:
```bash
	sudo apt-get install gcc-arm-linux-gnueabi gcc-arm-linux-gnueabihf
	cd demos/beaglebone
	make TARGET=LINUX-ARM
	scp beagle_demo debian@192.168.7.2:/var/lib/cloud9
```
Run the file in the beaglebone:
```bash
	sudo ./var/lib/cloud9/beagle_demo
```


## IEC61850 Client

Now we have top build the IEC 61850 client that will run in our Ubuntu machine.
First, add this line to beagle_client.c for the Thread_sleep() function to work:
```C
	#include "iec61850_client.h"
	#include "hal_thread.h"
```
Then, we have to modify the Makefile to build the file for the client:
```makefile
	PROJECT_BINARY_NAME = beagle_client
	PROJECT_SOURCES = beagle_client.c
```
Make the beagle_client file:
```bash
	make
```
Run the beagle_client file:
```bash
	sudo ./beagle_client [IP_ADDRESS_BEAGLE]
	sudo ./beagle_client beaglebone
```