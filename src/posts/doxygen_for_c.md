---
title: Using doxygen for C code
author: Maximiliano Valencia
date: 2018-04-10
---

Software documentation is really important to create modular, scalable and readable code. This allows you and your team to reuse code and don't start from the ground in every project.
A C code module can be divided in the definition (.h file) and implementation (.c file). The purpose of the definition or header file is to define the implemented functions,
libraries used, macros and public variables. In the header file we document the implemented functions without using technical details and describe the purpose of the function, parameters, etc.

The header file should begin with information about the license:
```c
	/****************************************************************************
	 * Copyright (C) 2018 by Maximiliano Valencia                               *
	 *                                                                          *
	 * This file is part of Box.                                                *
	 *                                                                          *
	 *   Box is free software: you can redistribute it and/or modify it         *
	 *   under the terms of the GNU Lesser General Public License as published  *
	 *   by the Free Software Foundation, either version 3 of the License, or   *
	 *   (at your option) any later version.                                    *
	 *                                                                          *
	 *   Box is distributed in the hope that it will be useful,                 *
	 *   but WITHOUT ANY WARRANTY; without even the implied warranty of         *
	 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the          *
	 *   GNU Lesser General Public License for more details.                    *
	 *                                                                          *
	 *   You should have received a copy of the GNU Lesser General Public       *
	 *   License along with Box.  If not, see <http://www.gnu.org/licenses/>.   *
	 ****************************************************************************/
```
Then we include information about the file:
```c
	/** 
	 *	@file threads.h 
	 *	@brief this header file will contain all required 
	 *	definitions and basic utilities functions.
	 *
	 *	@author Maximiliano Valencia
	 *
	 *	@date 4/10/2018
	 */
```
 And information about ever function:
 ```c
	/*!
	 *  @brief  Slave thread to perform the sum.
	 *	@author	Maximiliano Valencia
	 *	@date	4/10/2018
	 *  @pre    pthread_create() has been called
	 *  @param  ignored	Void pointer to argument passed when thread was created
	 *			with pthread_create()
	 *	Detailed description
	 */
```
The technical documentation will be achieved by documenting the file entities (functions, typedefs, global variables...etc).    
In the other hand, all functions must have technical explanations documented using inline comments within the function body.     