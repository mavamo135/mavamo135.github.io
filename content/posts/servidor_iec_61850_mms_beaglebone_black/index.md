---
title: Servidor MMS IEC 61850 en una Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-15
---

El protocolo de comunicación MMS del estándar IEC 61850 es utilizado en sistemas
de energía y es utilizado principalmente en Europa.

## Servidor MMS
Como sistema de desarrollo se utiliza una máquina virtual con Ubuntu 17.10.
Primero, se requiere descargar el repositorio desde Github:

```bash
git clone https://github.com/mz-automation/libiec61850.git
```

Después, vamos a compilar para la arquitectura ARM utilizando el compilador
gcc-arm-linux el ejemplo que viene en la carpeta demos/beaglebone:

```bash{numberLines: true}
sudo apt-get install gcc-arm-linux-gnueabi gcc-arm-linux-gnueabihf
cd demos/beaglebone
make TARGET=LINUX-ARM
scp beagle_demo debian@192.168.7.2:/var/lib/cloud9
```

Finalmente, hacemos una conexión mediante SSH con la Beaglebone black y 
corremos el programa:

```bash{numberLines: true}
sudo ./var/lib/cloud9/beagle_demo
```


## Cliente MMS

Ahora requerimos compilar el cliente MMS que va a correr en la máquina
virtual de Ubuntu. Primero modificamos el archivo Makefile para que compile
el programa del cliente MMS cambiando estas líneas:

```makefile{numberLines: true}
PROJECT_BINARY_NAME = beagle_client
PROJECT_SOURCES = beagle_client.c
```

Ahora compilamos el programa del cliente MMS:

```bash{numberLines: true}
make TARGET=LINUX-ARM
```

Finalmente, corremos el programa del cliente MMS en la máquina virtual Ubuntu:

```bash{numberLines: true}
sudo ./beagle_client [DIRECCION_IP_BEAGLE]
```