const jsonConverter = (response) => response.json();

const app = new Vue({
        el: '#app',
        data: {
            estadoModal: false,
            rickandmortyActual: null,
            rickandmorty: [],
            historial: []
        },
        methods: {
            guardarListaLocal() {
                localStorage.setItem("rickandmorty", JSON.stringify(this.rickandmorty));
            },
            guardarRickAndMortyLocal(data, url) {
                const rickandmorty = {...data, url};
                const historial = JSON.parse(localStorage.getItem("historial"));
                if (historial) {
                    historial.push(rickandmorty);
                    this.historial = historial;
                } else {
                    this.historial.push(rickandmorty);
                }
                localStorage.setItem("historial", JSON.stringify(this.historial));
            },
            obtenerRickAndMortyLocal(url) {
                const historial = JSON.parse(localStorage.getItem("historial"));
                if(historial) {
                    const rickandmorty = historial.find(rickandmorty => rickandmorty.url === url);
                    if(rickandmorty) {
                        return rickandmorty;
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            },
            obtenerListaLocal() {
                const rickandmorty = localStorage.getItem("rickandmorty");
                const historia = localStorage.getItem("historial");
                if (rickandmorty) {
                    this.rickandmorty = JSON.parse(rickandmorty);
                }
                if (historia) {
                    this.historial = JSON.parse(historia);
                }
            },
            mostrarModal() {
                this.estadoModal = true;
            },
            ocultarModal() {
                this.estadoModal = false;
            },
            verRickAndMorty(url) {
                const rickandmorty = this.obtenerRickAndMortyLocal(url);
                if(rickandmorty) {
                    this.rickandmortyActual = rickandmorty;
                    this.mostrarModal();
                } else {
                   fetch(url)
                    .then(jsonConverter)
                    .then(async data => {
                        const {gender, image, species, name, origin, location} = data;
                        const name_origin   = origin.name;
                        const name_location = location.name;
                        this.rickandmortyActual = {gender, image, name, species, name_origin, name_location};
                        this.guardarRickAndMortyLocal(this.rickandmortyActual, url);
                        this.mostrarModal();
                    });
                }
            },
            vaciarHistorial(){
                this.historial = [];
                localStorage.setItem("historial", JSON.stringify(this.historial));
            }
        },
        async mounted() {
            this.obtenerListaLocal();
            if(this.rickandmorty.length === 0) {
                const response = await fetch("https://rickandmortyapi.com/api/character?status=alive");
                const data = await response.json();
                this.rickandmorty = data.results;
                this.guardarListaLocal();
            }
        }
    }
);