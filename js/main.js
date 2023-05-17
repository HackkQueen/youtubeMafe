let buscador=document.querySelector('#seleccionar');
let boton=document.querySelector('#boton');


boton.addEventListener('click', ()=>{
    let busqueda=buscador.value;
    console.log(busqueda);
    api1(busqueda);
})


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dfe60070dmshf83eb79d7747044p15e979jsnc36e9f16a8f1',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};
async function api1(val) {
    const response = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${val}&hl=en&gl=US`, options);
        const result = await response.json();
        api(result.contents[0].video.videoId)
}

/*se inician los procesos */
async function api(id) {
    try {
        const url2 = await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`,options);
        const result2 = await url2.json();
        let estatusxxx= result2.stats
        let visualizacion=document.querySelector('#visualizacion')
        let likes=document.querySelector('#likes')
        let cantidadComentarios=document.querySelector('#cantidadComentarios')
        let description=document.querySelector('#description')

        visualizacion.innerHTML=estatusxxx.views;
        likes.innerHTML=estatusxxx.likes;
        cantidadComentarios.innerHTML=estatusxxx.comments;
        description.innerHTML=result2.description; 


        let videoxxx=result2
        let nombreCanal=document.querySelector('#nombreCanal')
        let nombreTitulo=document.querySelector('#nombreTitulo')
        let iframevideo=document.querySelector('#iframevideo')
        let imagenLogo=document.querySelector('#imagenLogo')
        
        iframevideo.src=`https://www.youtube.com/embed/${videoxxx.videoId}`
        nombreCanal.innerHTML=videoxxx.author.title;
        nombreTitulo.innerHTML=videoxxx.title;
        imagenLogo.src=videoxxx.author.avatar[0].url;

        const url3 = await fetch(`https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`,options);
        const result3 = await url3.json();

        let com=document.getElementById('usuarios');
        let box='';
        if (result3.comments && result3.comments.length > 0) {
            result3.comments.forEach(element => {
                box += `
                <li><img height="10%" width="10%" src="${element.author.avatar[0].url}" alt=""><strong>${element.author.title}:</strong> ${element.content}</li>
                `;
            });
        } else {
            box = '<li>No hay comentarios disponibles</li>';
        }
        com.innerHTML = box;

        
        const url4 = await fetch( `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`,options);
        const result4 = await url4.json();
        let vidRel=document.getElementById('container_videos_relacionados')
        console.log(result4.contents)
        vidRel.innerHTML='';
        result4.contents.forEach(element => {
            console.log(element)
            if (element.type!='video') return;
            let str=
            `
            <div class="video_relacionado">
                <img class="vidRelacionados" id="${element.video.videoId}" height="100%" width="100%" src="${element.video.thumbnails[0].url}" alt="">
            </div>
            `;
            vidRel.insertAdjacentHTML('beforeend',str);
        })
        let vidRelacionados=document.querySelectorAll('.vidRelacionados');
        vidRelacionados.forEach(element => {
            element.addEventListener('click',()=>{
                api(element.id)
            })
        })
        

    } catch (error) {
        console.error(error);
    }
} 
