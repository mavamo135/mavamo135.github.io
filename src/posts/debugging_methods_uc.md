---
title: Embedded systems debugging methods
author: Maximiliano Valencia
date: 2018-03-22
---

```c
#define SIZE 100
uint8_t Debug_Buffer[SIZE][2];
unsigned int Debug_Cnt=0;
void Debug_Dump(void){ // dump P1IN and P2OUT
  if(Debug_Cnt < SIZE){
    Debug_Buffer[Debug_Cnt][0] = P1IN;
    Debug_Buffer[Debug_Cnt][1] = P2OUT;
    Debug_Cnt++;
  }
}

#define SIZE 100
uint8_t Debug_Buffer[SIZE][2];
unsigned int Debug_Cnt=0;
void Debug_FilteredDump(void){ // dump P1IN and P2OUT
  if((P1IN&0x80)&&(Debug_Cnt < SIZE)){
    Debug_Buffer[Debug_Cnt][0] = P1IN;
    Debug_Buffer[Debug_Cnt][1] = P2OUT;
    Debug_Cnt ++;
  }
}

#define LEDOUT (*((volatile uint8_t *)(0x42000000+32*0x4C02+4*0)))
#define Debug_HeartBeat() (LEDOUT ^= 0x01) 
```

Next, you add Debug_HeartBeat(); statements at strategic places within the system. 
Port 1 must be initialized so that bit 0 is an output before the debugging begins. 
You can either observe the LED directly or look at the LED control signals with a high-speed oscilloscope or logic analyzer. 
When using LED monitors it is better to modify just the one bit, leaving the other 7 as is. 
In this way, you can have multiple monitors on one port.

```c
uint32_t Debug_time[20];
uint8_t Debug_place[20];
uint32_t n;
void Debug_Profile(uint8_t p){
  if(n < 20){
    Debug_time[n] = STCURRENT; // record current time
    Debug_place[n] = p;
  n++;
  }
}
uint32_t sqrt(uint32_t s){
uint32_t t; // t*t becomes s
int n; // loop counter
  Debug_Profile(0);
  t = s/10+1; // initial guess
  Debug_Profile(1);
  for(n = 16; n; --n){ // will finish
    Debug_Profile(2);
    t = ((t*t+s)/t)/2;
  }
  Debug_Profile(3);
  return t;
} 
```