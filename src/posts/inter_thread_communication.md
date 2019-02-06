---
title: Inter-thread communication in C
author: Maximiliano Valencia
date: 2018-03-23
---

One of the classic problems our operating system must handle is communication between threads. 
We define a producer thread as one that creates or produces data. 
A consumer thread is a thread that consumes (and removes) data. 
The communication mechanism we will use in this chapter is a mailbox (Figure 2.6). 
The mailbox has a Data field and a Status field. 
Mailboxes will be statically allocated global structures. 
Because they are global variables, it means they will exist permanently and can be carefully shared by more than one task. 
The advantage of using a structure like a mailbox for a data flow problem is that we can decouple the producer and consumer threads. 