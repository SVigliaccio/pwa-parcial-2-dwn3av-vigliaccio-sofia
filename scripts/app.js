Vue.component("componente-mail", {
    data: function () {
        return {
            title: null,
            message: null,
            enviado: null,
        }
    },
    props: [],
    template: `
    <div v-if="enviado !== null" class="modal fade" id="modal-respuesta-mail" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="modal-respuesta-mail-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-respuesta-mail-label">{{title}}</h5>
                    <button type="button" class="btn-close"  @click="resetParams()" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{message}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="resetParams()" class="btn btn-rosa" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
    `,
    mounted() {
        const url     = new URL(window.location.href);
        this.enviado  = url.searchParams.get('enviado');
        if(this.enviado){
            this.title   = '¡Mensaje enviado!';
            this.message = 'Su mensaje fue enviado correctamente, le responderemos a la brevedad a la casilla de mail que nos aclaro. ¡Muchas gracias!';
        }else if(!this.enviado && this.enviado !== null){
            this.title   = 'Oops... No se ha podido enviar su mensaje!';
            this.message = 'Lo sentimos hubo un error al intentar enviar su mensaje, por favor vuelva a intentarlo en unos minutos o envíenos un correo por fuera de la plataforma.';
        }

    },
    updated() {
        // Este código se ejecuta después de que el componente ha sido actualizado y el DOM ha sido modificado.
        if(this.enviado !== null){
            //abro modal si existe el parametro enviado.
            modalMail = new bootstrap.Modal(document.getElementById('modal-respuesta-mail'));
            modalMail.show();
        }
    },
    methods: {
        resetParams(){
            window.location = window.location.pathname; //para eliminar los parametros y el signo de pregunta.
        }
    }
});

Vue.component("componente-contacto", {
    data: function () {
        return {
            github: 'https://github.com/SVigliaccio',
        }
    },
    props: [],
    template: `
    <div class="menu-contact">
        <input type="checkbox" name="" id="" class="check">
        <div class="openButtom">
            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="26" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </div>
        <div class="options">
        <div>
            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-mail">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            </a>
        </div>
        <div>
            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-dudas">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="26" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM105.8 229.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L216 328.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V314.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H158.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM160 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            </a>
        </div>
        <div>
            <a :href="github" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
            </a>
        </div>
        </div>
    </div>
    `
});

Vue.component("componente-form", {
    data: function () {

        return {
            form_data: {
                food: "",
                timeOfDay: ['Merienda', 'Almuerzo', 'Cena', 'Postre'], //se coloca por default todos los filtros marcados
            },
            filteredFood: [],
            showButton: true,
            buttonText: "Mostrar todo",
            btnSearch: false,
            foods: []
        }
    },
    props: [],
    template: `
    <div class="mt-5 col-12 d-flex">
        <form v-on:submit.prevent class="col-5 text-center">
            <label for="buscador">¿Sabes lo que quieres?</label>
            <input id="buscador" type="text" v-model="form_data.food" placeholder="Escribe aquí..." @input="updateButtonValue()" pattern="[a-zA-Z ]+"
            title="Solo se permiten letras"/>
            <span v-if="showButton"> ó </span>
            <button class="btn btn-rosa" @click="search()">{{buttonText}}</button>
            <div class="col-12 d-flex botonera">
                <label class="pressed" >Postre
                    <input type="checkbox" @change="setCheck()" value="Postre" v-model="form_data.timeOfDay">
                </label>
                
                <label class="pressed" >Merienda
                    <input type="checkbox" @change="setCheck()" value="Merienda" v-model="form_data.timeOfDay">
                </label>
                
                <label class="pressed">Almuerzo
                    <input type="checkbox" @change="setCheck()" value="Almuerzo" v-model="form_data.timeOfDay">
                </label>
                
                <label class="pressed" >Cena
                    <input type="checkbox" @change="setCheck()" value="Cena" v-model="form_data.timeOfDay">
                </label>
            </div>
        </form>
        <componente-listado
        :filtered-food = "filteredFood"
        :time-of-day = "form_data.timeOfDay"
        :btn-search = "btnSearch"
        > </componente-listado>
    </div>
    `,
    methods: {
        setCheck: function () {
            let input = event.target;
            // input.parentNode.classList.toggle('pressed');
            if(input.parentNode.classList.value === 'pressed'){
                input.parentNode.classList.value = 'no-pressed';
            }else{
                input.parentNode.classList.value = 'pressed';
            } 
        },
        search: function () {
            let searchFood = this.form_data.food;
            finded = this.foods.find(function (food) {
                return food.name == searchFood;
            });
            let copy = [...this.foods];
            let patron = new RegExp(`^${searchFood}`, 'i'); //la "i" hace que la busqueda sea case insensitive.

            this.filteredFood = copy.filter(function (food) {
                return food.name.match(patron);
            });
            this.btnSearch = true;
        },
        updateButtonValue: function () {
            if (this.form_data.food) {
                this.showButton = false;
                this.buttonText = "Buscar";
            } else {
                this.showButton = true;
                this.buttonText = "Mostrar todo";
            }
        },
        async cargarDatos() {
            try {
                const response = await fetch("https://recetario--sofiavigliaccio.repl.co/recetas");
                const data = await response.json();
                this.foods = data.results;
                return this.foods;
            } catch (error) {
                console.error(error.message);
                throw error; // Re-lanzar el error para que pueda ser manejado por el componente que llama.
            }
        }
    },
    async mounted() {
        // Realizar operaciones asíncronas para inicializar los datos
        let arr = JSON.parse(localStorage.getItem("favorite"));
        let foodsCharge = await this.cargarDatos();

        let filtered = [];

        if (localStorage.favorite) {
            arr.forEach(function (id) {
                let regIndex = foodsCharge.findIndex(elem => elem.id == id);
                foodsCharge[regIndex].favorite = true;
                filtered.push(foodsCharge[regIndex]);
            });
        }

        // Actualizar las propiedades de datos después de la carga asíncrona
        this.filteredFood = filtered;
        this.foods = foodsCharge;
    },

});


Vue.component("componente-listado", {
    data: function () {
        return {
            flags: []
        }
    },
    props: ['filteredFood', 'timeOfDay', 'btnSearch'],
    template: `
        <ul class="mt-5 col-8" >
            <li class="food card spin spin-not" v-if="filteredFood.length === 0 && btnSearch">
            <div class="card-body d-flex justify-content-between spin spin-not">
                    <div>
                        <div >
                            <img :src="'img/pancakes.png'" :alt="'logo de la app, pancakes'"/>
                            Oops! Receta no encontrada  
                            <img class="ms-2" :src="'img/flags/unknown.png'" :alt="'Bandera de pais desconocido'"/>
                        </div>
                        <div>
                            <span class="badge text-bg-goldenrod me-1">
                                No se ha encontrado una receta que coincida con su busqueda.
                            </span>
                        </div>
                    </div>
                </div>
            </li>
            
            <li v-for="(item, index) in filteredFood" :key="index" class="food card spin spin-not" v-if="item.timeOfDay.some(moment => timeOfDay.includes(moment))">
                <div class="card-body d-flex justify-content-between spin spin-not">
                    <div>
                        <div :class="item.class" >
                            <img :src="'img/' + item.image" :alt="item.description"/>
                            {{ item.name | uppercase }} 
                            <img class="ms-2" :src="'img/' + flags[item.origin].image" :alt="flags[item.origin].alt"/>
                        </div>
                        <div>
                            <span class="badge text-bg-goldenrod me-1" v-for="time in item.timeOfDay">
                                {{time}}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="card">
                            <span :class="item.favorite ? 'card-body favorito' : 'card-body noFavorito'" @click="favorito(index)"></span>
                        </div>
                        <div class="card">
                            <span class="card-body info-food " @click="toggleInfo()"></span>
                        </div>
                    </div>
                </div>
                <div class="card-body d-flex justify-content-between desc spin ">
                    <div>
                        <span v-for="temp in item.temperature" class="badge text-bg-goldenrod me-1">{{temp}}</span>
                        <span v-for="tipo in item.typeFood" class="badge text-bg-goldenrod me-1"> {{tipo}}</span>
                        <p>Ingredientes</p>
                        <ul class=" d-flex flex-row ps-0 anchura">
                            <li class="ingridient badge text-bg-goldenrod me-1" v-for="ingredient in item.ingredients"><span>{{ingredient}}</span></li>
                        </ul>
                        <p>{{item.description}}</p>
                        <p>Enlace <a :href="item.link" target="_blank">Receta de {{item.name}}</a></p>
                    </div>
                    <div>
                        <div class="card">
                            <span :class="item.favorite ? 'card-body favorito' : 'card-body noFavorito'" @click="favorito(index)"></span>
                        </div>
                        <div class="card">
                            <span class="card-body info-food " @click="toggleInfo()"></span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    `,
    methods: {
        toggleInfo() {
            let card = event.target.parentNode.parentNode.parentNode.parentNode;
            let spinee = event.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll("div.spin");

            card.classList.toggle("spin-not");

            spinee[0].classList.toggle("spin-not")
            spinee[0].classList.toggle("desc")
            spinee[1].classList.toggle("spin-not")
        },
        favorito: function (index) {
            let arr = [];
            if (localStorage.favorite) { //me traigo lo que tengo en favoritos
                arr = JSON.parse(localStorage.getItem("favorite"));
            }

            if (this.filteredFood[index].favorite === false) {//agrego id a favoritos
                this.filteredFood[index].favorite = true;
                arr.push(this.filteredFood[index].id);

            } else {//elimino id de favoritos 
                arr.splice(arr.findIndex(elem => elem === this.filteredFood[index].id), 1);
                this.filteredFood[index].favorite = false;
            }
            //actualizo localStorage
            localStorage.setItem("favorite", JSON.stringify(arr));
        }
    },
    async mounted() {
        if (this.flags.length === 0) {
            const response = await fetch("https://recetario--sofiavigliaccio.repl.co/paises");
            const data = await response.json();
            this.flags = data.results;
        }
    }
});


var app = new Vue({
    el: ".container",
    data: {
        instalacionPendiente: true,
        instalacionPendiente: null,
        foods: []
    },//cierre data
    methods: {
        instalarAplicacion() {
            if (this.eventoDeInstalacion != null) {
                this.eventoDeInstalacion.prompt()
                    .then(({ outcome }) => {
                        if (outcome === "accepted") {
                            this.instalacionPendiente = false;
                        } else {
                            console.log("no se instaló");
                        }
                    });
            } else {
                console.log("no se puede instalar");
            }
        },
    },
    async mounted() {
        window.addEventListener("beforeinstallprompt", (event) => {
            this.eventoDeInstalacion = event;
            this.instalacionPendiente = true;
        });

        if (this.eventoDeInstalacion == null) {
            this.instalacionPendiente = false;
        }

        if (this.foods.length === 0) {
            const response = await fetch("https://recetario--sofiavigliaccio.repl.co/recetas");
            const data = await response.json();
            this.foods = data.results;
        }
    }
})

/**
 * 
                fullDesc:       "Previamente: Lavar 500g de arroz hasta que se aclare el agua por completo y dejar reposar en agua durante un día, dentro de la heladera. Luego, hervir a fuego medio durante 10 minutos, despues de apagar el fuego, dejar reposar el arroz dentro de la olla con tapa, durante 5 minutos, finalmente dejar reposar al aire libre durante 5 minutos mas. Terminado este proceso, mezclar 1/2 cucharada (sopera) de vinagre de arroz/alcohol, 1 cucharada de agua caliente (50°C-70°C) y 1 cucharada de azucar y mezclar bien, una vez se enfrie, esparcir en el arroz lo mas equitativamente sin generar charcos; Se recomienda hacerlo de a poco, mezclar bien el arroz y probarlo hasta que se este conforme con el resultado. Por otro lado, se debe filetear el pescado, en rectangulos no mas grande su menique. Luego de condimentar el arroz, formar un rectangulo en alguna superficie antiadherente, como alga maki o un film de cocina. Dejando un dedo de espacio entre los bordes de la cama de arroz, apoyamos el pescado en el arroz, formando una columna, al lado podremos adicionar nuestro roll con esparragos,  brocoli, zanahoria, queso crema, mayonesa o cualquier verdura o condimento que no brinde mucha humedad en nuestro roll. La parte mas complicada puede ser esta ultima, una vez dispuestos nuestros ingredientes en la cama de arroz, debemos levantarla de los border, tironeando de la alga maki o del film de cocina, para enrollarlos y asi crear el roll. ",
 * 
 * 
 */