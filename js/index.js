
//0 vacía
//1 jugador 1
//2 jugador 2
//3 desactivada


const casillasInicio =[
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const miWebSocket = new WebSocket('ws://localhost:8080');

new Vue({
    el: '#app',
    data: {
        jugador: '1',
        casillas: casillasInicio
    },
    mounted: function(){
        this.iniciarEventosWebSocket();
    },
    methods: {
        marcar: function(x,y){
            this.casillas[x][y]= parseInt(this.jugador)
            // foramoz el refresco
            this.$forceUpdate();
            // Enviamos lo pulsado a otro jugador
            miWebSocket.send(JSON.stringify({
                x:x,
                y:y,
                jugador: this.jugador
            }));

        },
        iniciarEventosWebSocket: function (){

                    // Funciones
            function open () {
                // Abre conexión
                console.log("WebSocket abierto.");
            }

            const message =  (evento)=> {
                // Se recibe un mensaje
                console.log("WebSocket ha recibido un mensaje");
                // Mostrar mensaje en HTML
                const datosRecibidos = JSON.parse(evento.data);
                this.casillas[datosRecibidos.x][datosRecibidos.y] = datosRecibidos.jugador;
                this.$forceUpdate();

            }

            function error (evento) {
                // Ha ocurrido un error
                console.error("WebSocket ha observado un error: ", evento);
            }

            function close () {
                // Cierra la conexión
                console.log("WebSocket cerrado.");
            }



            // Eventos de WebSocket
            miWebSocket.addEventListener('open', open);
            miWebSocket.addEventListener('message', message);
            miWebSocket.addEventListener('error', error);
            miWebSocket.addEventListener('close', close);
        }
    }
})