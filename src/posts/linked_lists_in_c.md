---
title: Listas enlazadas en C
author: Maximiliano Valencia
date: 2018-03-21
---

Una parte fundamental para definir las listas enlazadas es la estructura que 
tiene un elemento que apunta a otra estructura:

```c
typedef struct Node {
	Node *next;
	int data;
}
```


```c
int search(Node *list, int x) {
	Node *ptr;
	ptr = list;
	while(ptr) {
		if(pt->data == x) return 1; // Number found
		ptr = ptr->Next;
	}
	return 0; // Number not found
}

int main() {
	uint8_t result;
	Node linkedList[3] = {
		{&LinkedList[1], 1},
		{&LinkedList[2], 10},
		{NULL, 100}
	};
	result = search(linkedList, 9); // LinkedList = &LinkedList[0]
	if(result) printf("Number found!\n");
	else printf("Number not found!\n");
	return 0;
}
```
