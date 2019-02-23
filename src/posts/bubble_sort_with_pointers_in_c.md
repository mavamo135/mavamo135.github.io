---
title: Ordenación de burbuja en C
author: Maximiliano Valencia
date: 2018-03-20
---

```c
void BubbleSort(uint8_t *pt, uint32_t size)
{
   uint32_t i,j; 
   uint8_t data,*p1,*p2;

   for(i=1; i<size; i++)
   {
     p1 = pt; // pointer to beginning
     for(j=0; j<size-i; j++)
     {
       p2 = p1+1; // p2 points to the element after p1
       if(*p1 > *p2)
       {
         data = *p1; // swap
         *p1 = *p2;
         *p2 = data;
       }
      p1++;
    }
  }
} 

void main(void)
{
  BubbleSort(Vbuffer,100); // Vbuffer = &VBuffer[0]
  BubbleSort(Pbuffer,200); // Pbuffer = &PBuffer[0]
} 
```
