---
title: Function pointers in C
author: Maximiliano Valencia
date: 2018-03-23
---

```c
void (*PeriodicTask)(void); // user function
void BSP_PeriodicTask_Init(
  void(*task)(void), // user function
  uint32_t freq,     // frequency in Hz
  uint8_t priority){ // priority
// . . . PeriodicTask = task; // user function
// . . .
}
void T32_INT1_IRQHandler(void){
  TIMER32_INTCLR1 = 0x00000001; // acknowledge interrupt
  (*PeriodicTask)();            // execute user task
} 

 BSP_PeriodicTask_Init(&checkbuttons, 10, 2); 
 ```