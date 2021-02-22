
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
//Guido---------------------------------------------------------------------------------------------------------------------------------------
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Anotador de Generala',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/gracias/', url: 'gracias.html',
            options: { transition: 'f7-flip' },
        },
        {
            path: '/nombre/', url: 'nombre.html',
            options: { transition: 'f7-flip' },
        },
        {
            path: '/index/', url: 'index.html',
            options: { transition: 'f7-flip' },
        },

    ]
    // ... other parameters
});

var mainView = app.views.create('.view-main');


// VARIABLES GLOBALES
var nombre1 = "";
var nombre2 = "";
var valor = "";
var numero = 0;
var jugada = "";
var multiplicador = 0;
var juego = "";
var ganador = "";

$$(document).on('deviceready', function () {
});

$$(document).on('page:init', function (e) {
})

//Marina---------------------------------------------------------------------------------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="nombre"]', function (e) {

    $$('#btnVolver').on('click', function () {
        app.dialog.confirm('Desea volver atras? Se borraran todos los puntos.', function () {
            mainView.router.navigate('/index/');
        })
    })

    //---------------------------------------------

    $$('#jug1an').text(nombre1)
    $$('#jug2an').text(nombre2)

    //---------------------------------------------

    $$('.sumaNum').on('click', function () {

        //Insertamos en el MODAL el nombre del dado
        $$('.dado').text($$(this).data("nombre"))

        valor = this.id
    });

    //---------------------------------------------
    $$('.accNum').on('click', function () {

        numero = this.text
        multiplicador = valor[2]

        if (numero == "Tachar") {
            $$('#' + valor).text("X")
        }

        else {
            numero *= multiplicador
            $$('#' + valor).text(numero)
        }

        actualizar()

    });

    //Santi---------------------------------------------------------------------------------------------------------------------------------------

    $$('.sumaJug').on('click', function () {

        //Insertamos en el MODAL el nombre del dado
        $$('.dado').text($$(this).data("nombre"))

        valor = this.id
    });

    //---------------------------------------------
    $$('.accJug').on('click', function () {

        juego = valor[2] // e f p g d
        jugada = this.text

        if (juego == "e") {
            if (jugada == "Servido") {
                $$('#' + valor).text(25)
            }
            if (jugada == "No Servido") {
                $$('#' + valor).text(20)
            }
            if (jugada == "Tachar") {
                $$('#' + valor).text("X")
            }
        }

        if (juego == "f") {
            if (jugada == "Servido") {
                $$('#' + valor).text(35)
            }
            if (jugada == "No Servido") {
                $$('#' + valor).text(30)
            }
            if (jugada == "Tachar") {
                $$('#' + valor).text("X")
            }
        }

        if (juego == "p") {
            if (jugada == "Servido") {
                $$('#' + valor).text(45)
            }
            if (jugada == "No Servido") {
                $$('#' + valor).text(40)
            }
            if (jugada == "Tachar") {
                $$('#' + valor).text("X")
            }
        }

        if (juego == "g") {
            if (jugada == "Servido") {
                $$('#' + valor).text(55)
            }
            if (jugada == "No Servido") {
                $$('#' + valor).text(50)
            }
            if (jugada == "Tachar") {
                $$('#' + valor).text("X")
            }
        }

        if (juego == "d") {
            if (jugada == "Servido") {
                $$('#' + valor).text(65)
            }
            if (jugada == "No Servido") {
                $$('#' + valor).text(60)
            }
            if (jugada == "Tachar") {
                $$('#' + valor).text("X")
            }
        }

        actualizar()

    });

    //Guido -------------------------------------------------------------------------------------------------------------------------------------

    $$('#limpiar').on('click', function () {
        app.dialog.confirm('Limpiar anotador?', function () {
            limpiar()
        })
    });

    //---------------------------------------------

    function limpiar() {
        $$('.sumaNum').text('-')
        $$('.sumaJug').text('-')

        $$('#pj1, #pj2').text('0')
    }

    //---------------------------------------------

    function actualizar() {

        var puntos1 = 0;
        var puntos2 = 0;

        $$(".eq1").each(function () {
            switch (this.text) {
                case "-":
                    break;
                case "X":
                    break;
                default:
                    puntos1 += parseInt(this.text)
                    break;
            }
        })

        $$('#pj1').text(puntos1)

        //--------------

        $$(".eq2").each(function () {
            switch (this.text) {
                case "-":
                    break;
                case "X":
                    break;
                default:
                    puntos2 += parseInt(this.text)
                    break;
            }
        })

        $$('#pj2').text(puntos2)

    }

    //---------------------------------------------

    $$('#terminar').on('click', function () {
        app.dialog.confirm('Desea finalizar la partida?', function () {
            var tot1 = parseInt($$('#pj1').text())
            var tot2 = parseInt($$('#pj2').text())

            app.dialog.alert(nombre1 + ": " + tot1 + "<br>" + nombre2 + ": " + tot2, "Puntuacion Final");

            if (tot1 > tot2) {
                ganador = nombre1
            }

            if (tot2 > tot1) {
                ganador = nombre2
            }

            if (tot2 == tot1) {
                ganador = "empate"
            }

            limpiar();

            mainView.router.navigate('/gracias/');
        })
    });

});

//Facu ---------------------------------------------------------------------------------------------------------------------------------------

$$(document).on('page:init', '.page[data-name="gracias"]', function (e) {

    if (ganador == "empate") {
        $$('#mensaje').text("Empate!!!")
    }
    else {
        $$('#mensaje').text("El ganador es: " + ganador + " Felicitaciones!!");
    }

})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {

    $$('#inicio').on('click', function () {

        nombre1 = $$('#jug1').val();
        nombre2 = $$('#jug2').val();

        if (nombre1 == "" || nombre2 == "") {
            app.dialog.alert('Completa todos los campos', "Error!");
        }
        else {
            fnTomarValores()
        }

    });

});

function fnTomarValores() {
    mainView.router.navigate('/nombre/');

}

//---------------------------------------------------------------------------------------------------------------------------------------

