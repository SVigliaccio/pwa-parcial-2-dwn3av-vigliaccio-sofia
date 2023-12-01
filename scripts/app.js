
Vue.component("componente-form", {
    data:function(){
        let arr      = JSON.parse(localStorage.getItem("favorite"));
        let foods    = [...this.foods];
        
        let filtered = [];
        if(localStorage.favorite){ //me traigo lo que tengo en favoritos

            // agrego clase de favoritos
            arr.forEach(function (id){
                let regIndex = foods.findIndex(elem => elem.id == id);
                foods[regIndex].favorite = true;
                filtered.push(foods[regIndex]);
            });
        }
		return {
            form_data:{
                food:"",
                timeOfDay:['Merienda', 'Almuerzo', 'Cena', 'Postre'], //se coloca por default todos los filtros marcados
			},
            filteredFood: filtered,
            showButton: true,
            buttonText: "Mostrar todo",
            
		}
	},
    props: ['foods'],
    template: `
    <div class="mt-5 col-12 d-flex">
        <form v-on:submit.prevent class="col-5 text-center">
            <label for="buscador">¿Sabes lo que quieres?</label>
            <input id="buscador" type="text" v-model="form_data.food" placeholder="Escribe aquí..." @input="updateButtonValue()"/>
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
        > </componente-listado>
    </div>
    `,
    methods: {
        setCheck:function(){
            console.log(this.favorites)
            let input = event.target;
            input.parentNode.classList.toggle('pressed');
        },
        search: function () {
            let searchFood = this.form_data.food;
            finded = this.foods.find(function (food) {
                return food.name == searchFood;
            });
            let copy    = [...this.foods];
            let patron  = new RegExp(`^${searchFood}`, 'i'); //la "i" hace que la busqueda sea case insensitive.

            this.filteredFood = copy.filter(function (food) {
                return food.name.match(patron);
            });
        },
        updateButtonValue: function (){
            if(this.form_data.food){
                this.showButton = false;
                this.buttonText = "Buscar";
            }else{
                this.showButton = true;
                this.buttonText = "Mostrar todo";
            }
        }
    }
});


Vue.component("componente-listado", {
    data:function(){
		return {
			flags: [
                {
                    id: 0,
                    name: "Desconocido",
                    image: "flags/unknown.png",
                    alt: "Bandera de pais desconocido"
                },
                {
                    id: 1,
                    name: "Italia",
                    image: "flags/italia.png",
                    alt: "Bandera de Italia"
                },
                {
                    id: 2,
                    name: "México",
                    image: "flags/mexico.png",
                    alt: "Bandera de México"
                },
                {
                    id: 3,
                    name: "Argentina",
                    image: "flags/argentina.png",
                    alt: "Bandera de Argentina"
                },
                {
                    id: 4,
                    name: "Alemania",
                    image: "flags/alemania.png",
                    alt: "Bandera de Alemania"
                },
                {
                    id: 5,
                    name: "EE.UU",
                    image: "flags/eeuu.png",
                    alt: "Bandera de EE.UU"
                },
                {
                    id: 6,
                    name: "Japón",
                    image: "flags/japan.png",
                    alt: "Bandera de Japón"
                }
            ]
		}

	},
    props: ['filteredFood', 'timeOfDay'],
    template: `
        <ul class="mt-5 col-8" >
            <li v-for="(item, index) in filteredFood" :key="index" class="food card spin spin-not" v-if="item.timeOfDay.some(moment => timeOfDay.includes(moment))">
                <div class="card-body d-flex justify-content-between spin spin-not">
                    <div>
                        <div :class="item.class" >
                            <img :src="'img/' + item.image" :alt="item.description"></img>
                            {{ item.name | uppercase }} 
                            <img class="ms-2" :src="'img/' + flags[item.origin].image" :alt="flags[item.origin].alt"></img>
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
        toggleInfo(){
            let card    = event.target.parentNode.parentNode.parentNode.parentNode;
            let spinee  = event.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll("div.spin"); 

            card.classList.toggle("spin-not"); 
            
            spinee[0].classList.toggle("spin-not") 
            spinee[0].classList.toggle("desc") 
            spinee[1].classList.toggle("spin-not") 
        },
        favorito:function(index){
            let arr = [];
            if(localStorage.favorite){ //me traigo lo que tengo en favoritos
                arr = JSON.parse(localStorage.getItem("favorite"));
            }
            
            if(this.filteredFood[index].favorite === false){//agrego id a favoritos
                this.filteredFood[index].favorite = true;
                arr.push(this.filteredFood[index].id);

            }else{//elimino id de favoritos 
                arr.splice(arr.findIndex(elem => elem === this.filteredFood[index].id), 1);
                this.filteredFood[index].favorite = false;
            }
            //actualizo localStorage
            localStorage.setItem("favorite",JSON.stringify(arr)); 
        }
    }
});


var app = new Vue({
    el: ".container",
    data: {
        instalacionPendiente: true,
        instalacionPendiente: null,
        foods: [
            {
                description:    "Pescado y arroz envueltos en alga.",
                ingredients:    ['Arroz', 'Pescado', 'Alga'],
                temperature:    ["Frio"],
                timeOfDay:      ["Almuerzo", "Cena"],
                typeFood:       ["Salado"],
                favorite:       false,
                origin:         6,
                image:          "maki_roll.png",
                name:           "Rollitos maki",
                link:           "https://gastronomiaycia.republica.com/2008/08/26/recetas-sushi-maki-sushi/",
                id:             1,
            },
            {
                description:    "Superesponjosa.",
                ingredients:    ['Harina de maiz'],
                temperature:    ["Caliente", "Frio"],
                timeOfDay:      ["Desayuno", "Almuerzo", "Merienda", "Cena"],
                typeFood:       ["Salado"],
                favorite:       false,
                origin:         2,
                image:          "tortilla_maiz.png",
                name:           "Tortilla de maiz",
                link:           "https://www.cocinista.es/web/es/recetas/cocina-internacional/america/tortillas-de-maiz.html",
                id:             2,
            },
            {
                description:    "Cremoso, dulce y divertido de comer.",
                ingredients:    ['Leche', 'Azúcar', 'Arroz'],
                temperature:    ["Caliente", "Frio"],
                timeOfDay:      ["Desayuno", "Almuerzo", "Merienda", "Cena"],
                typeFood:       ["Dulce"],
                favorite:       false,
                origin:         3,
                image:          "arroz_leche.png",
                name:           "Arroz con leche",
                link:           "https://www.paulinacocina.net/arroz-con-leche-facil-delicioso/13790",
                id:             3,
            },
            {
                description:    "Difícil encontrar a alguien a quien no le guste.",
                ingredients:    ['Leche', 'Azúcar'],
                temperature:    ["Frio"],
                timeOfDay:      ["Postre", "Merienda"],
                typeFood:       ["Dulce"],
                favorite:       false,
                origin:         0,
                image:          "helado.png",
                name:           "Helado",
                link:           "https://www.directoalpaladar.com/directo-al-paladar/cinco-helados-buscados-internet-sus-recetas-faciles-deliciosas",
                id:             4,
            },
            {
                description:    "Un bocado muy práctico para los exploradores.",
                ingredients:    ['Pan', 'Zanahoria', 'Berenjena'],
                temperature:    ["Caliente"],
                timeOfDay:      ["Almuerzo", "Cena"],
                typeFood:       ["Salado"],
                favorite:       false,
                origin:         4,
                image:          "hamburguesa_vegetariana.png",
                name:           "Hamburguesa vegetariana",
                link:           "https://elgourmet.com/recetas/hamburguesa-vegetariana-de-betabel-y-zanahoria/",
                id:             5,
            },
            {
                description:    "Una pila doble de tortitas ligeras y esponjosas.",
                ingredients:    ['Harina de trigo', 'Huevo', 'Manteca'],
                temperature:    ["Caliente"],
                timeOfDay:      ["Desayuno", "Merienda"],
                typeFood:       ["Dulce"],
                favorite:       false,
                origin:         5,
                image:          "pancakes.png",
                name:           "Pancakes",
                link:           "https://elgourmet.com/recetas/hot-pancakes/",
                id:             6,
            },
            {
                description:    "Extremadamente popular, y con motivo.",
                ingredients:    ['Harina de trigo', 'Tomate', 'Queso'],
                temperature:    ["Caliente"],
                timeOfDay:      ["Almuerzo", "Cena"],
                typeFood:       ["Salado"],
                favorite:       false,
                origin:         1,
                image:          "pizza.png",
                name:           "Pizza",
                link:           "https://www.recetasgratis.net/receta-de-pizza-casera-31391.html",
                id:             7,
            },
            {
                description:    "Todo un clasico.",
                ingredients:    ['Harina de trigo', 'Tomate'],
                temperature:    ["Caliente"],
                timeOfDay:      ["Almuerzo", "Cena"],
                typeFood:       ["Salado"],
                favorite:       false,
                origin:         1,
                image:          "spaghetti.png",
                name:           "Spaghetti",
                link:           "https://recetinas.com/recetas-faciles-de-espaguetis/",
                id:             8,
            },
        ]
    },//cierre data
    methods: {
        instalarAplicacion() {
            if(this.eventoDeInstalacion != null) {
                this.eventoDeInstalacion.prompt()
                    .then(({outcome}) => {
                        if(outcome === "accepted") {
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
    mounted() {
        window.addEventListener("beforeinstallprompt", (event) => {
            this.eventoDeInstalacion = event;
            this.instalacionPendiente = true;
        });

        if(this.eventoDeInstalacion == null) {
            this.instalacionPendiente = false;
        }
    }
})

/**
 * 
                fullDesc:       "Previamente: Lavar 500g de arroz hasta que se aclare el agua por completo y dejar reposar en agua durante un día, dentro de la heladera. Luego, hervir a fuego medio durante 10 minutos, despues de apagar el fuego, dejar reposar el arroz dentro de la olla con tapa, durante 5 minutos, finalmente dejar reposar al aire libre durante 5 minutos mas. Terminado este proceso, mezclar 1/2 cucharada (sopera) de vinagre de arroz/alcohol, 1 cucharada de agua caliente (50°C-70°C) y 1 cucharada de azucar y mezclar bien, una vez se enfrie, esparcir en el arroz lo mas equitativamente sin generar charcos; Se recomienda hacerlo de a poco, mezclar bien el arroz y probarlo hasta que se este conforme con el resultado. Por otro lado, se debe filetear el pescado, en rectangulos no mas grande su menique. Luego de condimentar el arroz, formar un rectangulo en alguna superficie antiadherente, como alga maki o un film de cocina. Dejando un dedo de espacio entre los bordes de la cama de arroz, apoyamos el pescado en el arroz, formando una columna, al lado podremos adicionar nuestro roll con esparragos,  brocoli, zanahoria, queso crema, mayonesa o cualquier verdura o condimento que no brinde mucha humedad en nuestro roll. La parte mas complicada puede ser esta ultima, una vez dispuestos nuestros ingredientes en la cama de arroz, debemos levantarla de los border, tironeando de la alga maki o del film de cocina, para enrollarlos y asi crear el roll. ",
 * 
 * 
 */