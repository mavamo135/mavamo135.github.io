---
title: API GPIO en una Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-04
---

En este post vamos a hacer una API usando Javascript para controlar los LEDs
de la Beaglebone Black.

Primero, requerimos los módulos necesarios para crear el servidor y para accesar
a los GPIOs:
```Javascript
	#!/usr/bin/env node
	var b = require('bonescript')
	var http = require('http')
	var url = require('url')
```

Inicializamos los GPIOs de los LEDs como salidas y escribimos un valor de LOW:
```Javascript
	var state = [b.LOW, b.LOW, b.LOW, b.LOW]
	var leds = ["USR0", "USR1", "USR2", "USR3"]

	for (var i in leds) {
		b.pinMode(leds[i], b.OUTPUT)
		b.digitalWrite(leds[i], state[i])
	}
```

Creamos el servidor con el módulo http y definimos la función para manejar las
peticiones del cliente:
```Javascript
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

Definimos las funciones para escribir a los GPIOs y creamos una función periódica 
para saber que nuestro programa está corriendo:
```Javascript
	setInterval( () => {
		toggle(3)
	}, 1000)

	function toggle(i) {
		if(state[i] == b.LOW) state[i] = b.HIGH
		else state[i] = b.LOW
		b.digitalWrite(leds[i], state[i])
	}

	function setState(i, state) {
		if (state == 'ON') b.digitalWrite(leds[i], b.HIGH)
		else b.digitalWrite(leds[i], b.LOW)
	}
```

Para hacer conexión con el servidor podemos utilizar un navegador web y conectar 
a la siguiente dirección <DIRECCION_IP_BEAG>:3001/USR0?1.