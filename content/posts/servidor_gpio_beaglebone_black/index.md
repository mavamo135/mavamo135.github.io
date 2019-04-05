---
title: Servidor GPIO en una Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-16
---

[Repositorio del código](https://github.com/mavamo135/gpio_server)

En este post vamos a hacer un servidor utilizando Javascript para controlar 
los LEDs de la Beaglebone Black. El post está dividido en programación del 
servidor y del cliente.

##Servidor

Primero, requerimos los módulos necesarios para crear el servidor y para accesar
a los GPIOs:

```Javascript{numberLines: true}
#!/usr/bin/env node
var http = require('http').createServer(handler)
var fs = require('fs')
var io = require('socket.io')(http)
var Gpio = require('bonescript')
```

La librería `http` se utiliza para crear un servidor y se define que la función
`handler` es utilizada para manejar las conexiones del servidor. La librería 
`fs` se utiliza para poder acceder al sistema de archivos y leer el archivo 
HTML que será enviado al cliente. La librería `socket` es utilizada para enviar
y recibir notificaciones con el cliente. La librería `bonescript` es utilizada 
para controlar el estado de los LEDs.

Primero, se inicializan los GPIOs de los LEDs como salidas y escribimos un valor 
de LOW:

```Javascript{numberLines: true}
var state = [Gpio.LOW, Gpio.LOW, Gpio.LOW, Gpio.LOW]
var leds = ["USR0", "USR1", "USR2", "USR3"]

for (var i in leds) {
    b.pinMode(leds[i], b.OUTPUT)
    b.digitalWrite(leds[i], state[i])
}
```

El siguiente código indica al servidor que reciba peticiones de conexión al 
puerto 3002 y también se define la función `handler` que maneja las conexiones 
al servidor. Cuando un cliente se conecta se lee el archivo HTML `index.html` 
ubicado en la carpeta `public` y este archivo es enviado al cliente.

```Javascript{numberLines: true}
http.listen(3002); //listen to port 3002
function handler (req, res) { //create server handler function
    fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'}) //display 404 on error
            return res.end("404 Not Found")
        }
        res.writeHead(200, {'Content-Type': 'text/html'}) //write HTML
        res.write(data) //write data from index.html
        return res.end()
    })
}
```

La siguiente función maneja las conexiones de los sockets de los clientes. 
Cuando un cliente se conecta se le envían los estados actuales de los LEDs y 
se definen las funciones que manejan los cambios en los LEDs del lado del
cliente.

```Javascript{numberLines: true}
io.sockets.on('connection', function (socket) {// WebSocket Connection
    socket.emit('led1', state[0]); //send led0 status to client
    socket.emit('led2', state[1]); //send led1 status to client
    socket.emit('led3', state[2]); //send led2 status to client
    socket.emit('led4', state[3]); //send led3 status to client
    socket.on('led1', function(data) { //get light switch status from client
        setLed(0, data)
    })
    socket.on('led2', function(data) { //get light switch status from client
        setLed(1, data)
    })
    socket.on('led3', function(data) { //get light switch status from client
        setLed(2, data)
    })
    socket.on('led4', function(data) { //get light switch status from client
        setLed(3, data)
    })
})

function setLed(led, value) {
    state[led] = value ? Gpio.HIGH : Gpio.LOW
    Gpio.digitalWrite(leds[led], state[led])
}
```

Finalmente, definimos la función que va a manejar el comando de paro del programa
del usuario (CTRL+C).

```Javascript{numberLines: true}
process.on('SIGINT', function () { //on ctrl+c
    Gpio.digitalWrite(leds[0], Gpio.LOW) // Turn LED off
    Gpio.digitalWrite(leds[1], Gpio.LOW) // Turn LED off
    Gpio.digitalWrite(leds[2], Gpio.LOW) // Turn LED off
    Gpio.digitalWrite(leds[3], Gpio.LOW) // Turn LED off
    process.exit() //exit completely
})
```

##Cliente

En el archivo HTML que se envía el cliente simplemente se definen cuatro 
entradas de tipo `checkbox` pero el código CSS les da un aspecto de switches. 
Cada entrada es utilizada para controlar un LED.

```HTML{numberLines: true}
<body>
    <h1>Control LED light</h1>
    <p>USR0 
        <label class="switch">
            <input type="checkbox" id="led1">
            <span class="slider round"></span>
        </label>
    </p>
    <p>USR1 
        <label class="switch">
            <input type="checkbox" id="led2">
            <span class="slider round"></span>
        </label>
    </p>
    <p>USR2 
        <label class="switch">
            <input type="checkbox" id="led3">
            <span class="slider round"></span>
        </label>
    </p>
    <p>USR3 
        <label class="switch">
            <input type="checkbox" id="led4">
            <span class="slider round"></span>
        </label>
    </p>
</body>
```

En el archivo HTML también se incluye el código JavaScript que utiliza la 
librería `socket` para enviar y recibir notificaciones con el servidor cuando 
cambia el estado de un switch.

```HTML{numberLines: true}
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script> <!-- include socket.io client side script -->
<script>
    var socket = io(); //load socket.io-client and connect to the host that serves the page
    window.addEventListener("load", function(){ //when page loads
        var led1CB = document.getElementById("led1")
        led1CB.addEventListener("change", function() { //add event listener for when checkbox changes
            socket.emit("led1", Number(this.checked)) //send button status to server (as 1 or 0)
        })
        var led2CB = document.getElementById("led2")
        led2CB.addEventListener("change", function() { //add event listener for when checkbox changes
            socket.emit("led2", Number(this.checked)) //send button status to server (as 1 or 0)
        })
        var led3CB = document.getElementById("led3")
        led3CB.addEventListener("change", function() { //add event listener for when checkbox changes
            socket.emit("led3", Number(this.checked)) //send button status to server (as 1 or 0)
        })
        var led4CB = document.getElementById("led4")
        led4CB.addEventListener("change", function() { //add event listener for when checkbox changes
            socket.emit("led4", Number(this.checked)) //send button status to server (as 1 or 0)
        })
    })
    socket.on("led1", function (data) { //get button status from client
        console.log("led1: " + data)
        document.getElementById("led1").checked = data; //change checkbox according to push button on Raspberry Pi
    })
    socket.on("led2", function (data) { //get button status from client
        console.log("led2: " + data)
        document.getElementById("led2").checked = data; //change checkbox according to push button on Raspberry Pi
    })
    socket.on("led3", function (data) { //get button status from client
        console.log("led3: " + data)
        document.getElementById("led3").checked = data; //change checkbox according to push button on Raspberry Pi
    })
    socket.on("led4", function (data) { //get button status from client
        console.log("led4: " + data)
        document.getElementById("led4").checked = data; //change checkbox according to push button on Raspberry Pi
    })
</script>
```
