# Creación de un YOUTUBE Pirata ;)

#### Utilización

La pagina se utiliza a partir de una búsqueda del titulo del video deseado y al darle al botón automáticamente se mostraran los diferentes elementos de la pagina.

![](C:\Users\marif\youtubeMafe\img\imgbusqueda.jpg)

#### API

La API utilizada en este caso es **RapidApi* --> *[https://rapidapi.com/search/]()

Con JavaScript y fetch



## Y RECUERDA....

Utilizamos funciones asíncronas junto con la API para el correcto proceso de búsqueda y guardado

```js
async function api(val) {
    try {
        const response = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${val}&hl=en&gl=US`, options);
        const result = await response.json();
        let videoxxx=result.contents[0].video
        let nombreCanal=document.querySelector('#nombreCanal')
        let nombreTitulo=document.querySelector('#nombreTitulo')
        let iframevideo=document.querySelector('#iframevideo')
        let imagenLogo=document.querySelector('#imagenLogo')
```

# Diviértete y disfruta de buenos videos con la pagina !!
