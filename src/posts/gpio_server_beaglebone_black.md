---
title: GPIO server with Beaglebone Black
author: Maximiliano Valencia
date: 2018-03-16
---
#Making a GPIO server with a Beaglebone Black
In this post we will build a GPIO server using Javascript to control the Beaglebone Black on-board LEDs.
I will divide the post in server side and client side programming.

##Server

```Javascript
	#!/usr/bin/env node
	var http = require('http').createServer(handler)//require http server, and create server with function handler()
	var fs = require('fs')                          //require filesystem module
	var io = require('socket.io')(http)             //require socket.io module and pass the http object (server)
	var Gpio = require('bonescript')                //include onoff to interact with the GPIO
```
Initialize the GPIO of LEDs as outputs and set the value to low:
```Javascript
	var state = [Gpio.LOW, Gpio.LOW, Gpio.LOW, Gpio.LOW]
	var leds = ["USR0", "USR1", "USR2", "USR3"]
	for (var i in leds) {
		b.pinMode(leds[i], b.OUTPUT)
		b.digitalWrite(leds[i], state[i])
	}
```
Next, we will create our server with http and define the function handler:
```Javascript
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
We define the function that will handle the messages between the client and server:
```Javascript
	io.sockets.on('connection', function (socket) {// WebSocket Connection, connection from client
		socket.emit('led1', state[0]); //send led0status to client
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
		if (value == 1) state[led] = Gpio.HIGH
		else state[led] = Gpio.LOW
		Gpio.digitalWrite(leds[led], state[led])
	}
```
Last, we define the function that will handle the user stop of the program (CTRL+C):
```Javascript
	process.on('SIGINT', function () { //on ctrl+c
		Gpio.digitalWrite(leds[0], Gpio.LOW) // Turn LED off
		Gpio.digitalWrite(leds[1], Gpio.LOW) // Turn LED off
		Gpio.digitalWrite(leds[2], Gpio.LOW) // Turn LED off
		Gpio.digitalWrite(leds[3], Gpio.LOW) // Turn LED off
		process.exit() //exit completely
	})
```

##Client
The HTML file that will be received by the client is:
```HTML
	<!DOCTYPE html>
	<html>
		<head>
			
		</head>
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
	</html> 
```
The styles are defined inside the head tags with:
```HTML
	<style>
		.switch {
			position: relative;
			display: inline-block;
			width: 60px;
			height: 34px;
		}
		.switch input {display:none;}
		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ccc;
			-webkit-transition: .4s;
			transition: .4s;
		}
		.slider:before {
			position: absolute;
			content: "";
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			-webkit-transition: .4s;
			transition: .4s;
		}
		input:checked + .slider {
			background-color: #2196F3;
		}
		input:focus + .slider {
			box-shadow: 0 0 1px #2196F3;
		}
		input:checked + .slider:before {
			-webkit-transform: translateX(26px);
			-ms-transform: translateX(26px);
			transform: translateX(26px);
		}
		/* Rounded sliders */
		.slider.round {
			border-radius: 34px;
		}
		.slider.round:before {
			border-radius: 50%;
		}
	</style>
```
The scripts are defined inside the head tags with:
```HTML
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
