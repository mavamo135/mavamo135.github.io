---
title: API GPIO en una Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-04
---

[Repositorio del código](https://github.com/mavamo135/gpio_api)

En este post vamos a hacer una API usando Javascript para controlar los LEDs
de la Beaglebone Black.

Primero, requerimos los módulos necesarios para crear el servidor y para accesar
a los GPIOs:

```Javascript{numberLines: true}
#!/usr/bin/env node
var http = require('http')
var b = require('bonescript')
var url = require('url')
```

La librería `http` se utiliza para crear un servidor. La librería `bonescript` 
es utilizada para controlar el estado de los LEDs. La librería `url` se utiliza 
para obtener los parámetros de las peticiones de los clientes

Primero, se inicializan los GPIOs de los LEDs como salidas y escribimos un valor 
de LOW:

```Javascript{numberLines: true}
var state = [b.LOW, b.LOW, b.LOW, b.LOW]
var leds = ["USR0", "USR1", "USR2", "USR3"]

for (var i in leds) {
    b.pinMode(leds[i], b.OUTPUT)
    b.digitalWrite(leds[i], state[i])
}
```

El siguiente código crea un servidor y define la funciones que va a manejar las
conexiones, también, indica al servidor que abra el puerto 3001 para conexiones 
con el cliente. Cuando un cliente se conecta se obtiene la ruta de la petición 
en la variable `urlReq` que indica cuál LED se quiere operar y la consulta en 
la variable `query` que tiene el dato `state` que indica el estado del LED que 
se va a operar.

```Javascript{numberLines: true}
http.createServer(function (req, res) {
    var urlReq = url.parse(req.url, true).pathname
    var query = url.parse(req.url, true).query
    switch(urlReq) {
        case '/USR0':
            res.writeHead(200, {'Content-Type': 'text/html'})
            setState(0, query.state) // Set state received from query
            break
        case '/USR1':
            res.writeHead(200, {'Content-Type': 'text/html'})
            setState(1, query.state) // Set state received from query
            break
        case '/USR2':
            res.writeHead(200, {'Content-Type': 'text/html'})
            toggle(2) // Toggle the LED USR2
            break
        default:
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.write(req.url + ' Not Found!')
    }
    res.end()
}).listen(3001)
```

Definimos las funciones para escribir a los GPIOs y creamos una función 
periódica de 1 segundo para saber que nuestro programa está corriendo.

```Javascript{numberLines: true}
setInterval( () => {
    toggle(3)
}, 1000)

// Function used to toggle a LED state
function toggle(led) {
    state[led] = state[led] == Gpio.LOW ? Gpio.HIGH : Gpio.LOW
    Gpio.digitalWrite(leds[led], state[led])
}

// Function used to set a value to a LED
function setState(led, value) {
    state[led] = value == 1 ? Gpio.HIGH : Gpio.LOW
    Gpio.digitalWrite(leds[led], state[led])
}
```

Para cambiar el estado de un LED se pueden utilizar los siguientes comandos:

```bash
# Apagar LED USR0
curl -v "<DIRECCION_IP_BEAG>:3001/USR0?state=0"
curl -v "beaglebone.local:3001/USR0?state=0"
# Encender LED USR0
curl -v "<DIRECCION_IP_BEAG>:3001/USR0?state=0"
curl -v "beaglebone.local:3001/USR0?state=1"

# Apagar LED USR1
curl -v "<DIRECCION_IP_BEAG>:3001/USR0?state=0"
curl -v "beaglebone.local:3001/USR1?state=0"
# Encender LED USR1
curl -v "<DIRECCION_IP_BEAG>:3001/USR0?state=0"
curl -v "beaglebone.local:3001/USR1?state=1"

# Invertir estado LED USR2
curl -v "<DIRECCION_IP_BEAG>:3001/USR0?state=0"
curl -v "beaglebone.local:3001/USR2"
```

El LED USR2 está configurado para que en cada petición se invierta su estado.

Si no tienes `curl`instalado puedes hacer conexión con el servidor utilizando 
un navegador web y conectandote a la siguiente dirección 
`<DIRECCION_IP_BEAG>:3001/USR0?1` o si la Beaglebone Black está conectada a tu 
computadora por el puerto USB puedes utilizar la siguiente dirección 
`beaglebone.local:3001/USR0?1`.
