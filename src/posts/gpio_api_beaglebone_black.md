---
title: GPIO API with Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-04
---

#Making a GPIO API with a Beaglebone Black
In this post we will build a GPIO API using Javascript to control the Beaglebone Black on-board LEDs.

```Javascript
	#!/usr/bin/env node
	var b = require('bonescript')
	var http = require('http')
	var url = require('url')
```
Initialize the GPIO of LEDs as outputs and set the value to low:
```Javascript
	var state = [b.LOW, b.LOW, b.LOW, b.LOW]
	var leds = ["USR0", "USR1", "USR2", "USR3"]

	for (var i in leds) {
		b.pinMode(leds[i], b.OUTPUT)
		b.digitalWrite(leds[i], state[i])
	}
```
Next, we will create our server with http:
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
We define our functions and we create a periodic function just to know that our program is running:
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