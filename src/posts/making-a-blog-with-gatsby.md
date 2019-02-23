---
title: Haciendo un blog con Gatsby
author: Maximiliano Valencia
date: "2018-03-12"
---

En este post voy a mostrar como crear tu página web para blog personal utilizando
Gatsby.

[Gatsby](https://www.gatsbyjs.org) es un generador de páginas estáticas con varias 
plantillas que puedes utilizar para crear tu proyecto. La ventaja de Gatsby es que 
las páginas estáticas se pueden alojar en páginas web que no pueden ejecutar código
del lado del servidor como Github Pages. Además, puedes obtener contenido desde múltiples
lugares gracias a que utiliza GraphQL.

##Requisitos

Primero, se requiere instalar la herramienta de línea de comandos de Gatsby.
```bash
    npm install -g gatsby-cli
```

Puedes utilizar una plantilla de blog para iniciar el proyecto:
```bash 
    gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
```

Listo! Puedes iniciar tu blog utilizando:
 ```bash
    cd my-blog-starter
    gatsby develop
```
