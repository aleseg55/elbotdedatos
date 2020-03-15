// Importar las dependencias para configurar el servidor
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// configurar el puerto y el mensaje en caso de exito
app.listen((process.env.PORT), () => console.log('El servidor webhook esta escuchando en el puerto ',process.env.PORT));

// Ruta de la pagina index
app.get("/elbotdedatos", function (req, res) {
    res.send("Chatea con el bot de Datos Concepción <b><a href='https://www.facebook.com/El-Bot-de-Datos-594527367555204'>acá</a></b>");
});


//variables de entorno para vincular con la app messenger de facebook
//const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
//const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/webhook', function(req, res) {
    // Verificar la coincidendia del token
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        // Mensaje de exito y envio del token requerido
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        // Mensaje de fallo
        console.error("La verificacion ha fallado, porque los tokens no coinciden");
        res.sendStatus(403);
    }
});

var puntaje = 0;

// Todos eventos de mesenger seran capturados por esta ruta
app.post("/webhook", function (req, res) {
    // Verificar si el evento proviene de la pagina asociada
    if (req.body.object == "page") {
        // Si existe multiples entradas entradas
        req.body.entry.forEach(function(entry) {
            // Iterara todos lo eventos capturados
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    process_message(event);
                }
                else if (event.postback) {
                    process_postback(event);
                }
            });
        });
        res.sendStatus(200);
    }
});

function askTemplatePreg1(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg1_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg1_resp_si"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg2(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg2_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg2_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No estoy seguro",
                        "payload":"preg2_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg3(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg3_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg3_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"Me suena",
                        "payload":"preg3_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg4(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg4_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg4_resp_si"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg5(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg5_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg5_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No lo sé",
                        "payload":"preg5_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg6(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg6_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg6_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No lo sé",
                        "payload":"preg6_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg7(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg7_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg7_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No lo sé",
                        "payload":"preg7_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg8(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Si",
                        "payload":"preg8_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"No",
                        "payload":"preg8_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"Son dudosas",
                        "payload":"preg8_resp_nose"
                    }
                ]
            }
        }
    }
}

function askTemplatePreg9(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Está en varios",
                        "payload":"preg9_resp_si"
                    },
                    {
                        "type":"postback",
                        "title":"Sólo la vi en este",
                        "payload":"preg9_resp_no"
                    },
                    {
                        "type":"postback",
                        "title":"No lo sé",
                        "payload":"preg9_resp_nose"
                    }
                ]
            }
        }
    }
}

function finalAskTemplate(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Otra noticia",
                        "payload":"otra_noticia"
                    },
                    {
                        "type":"postback",
                        "title":"Gracias",
                        "payload":"gracias"
                    }
                ]
            }
        }
    }
}

function comeBackAskTemplate(text){
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text": text,
                "buttons":[
                    {
                        "type":"postback",
                        "title":"Quiero probar otra",
                        "payload":"otra_noticia"
                    }
                ]
            }
        }
    }
}


// Funcion donde se procesara el evento
function process_message(event){
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
    
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){

        var response = {"text":"Por favor selecciona alguna opción del último mensaje"}

        // Enviamos el mensaje mediante SendAPI
        enviar_texto(senderID, response);
    }
}

puntaje=0;
pregunta=0;

function process_postback(event){

    var senderID = event.sender.id;
    var respuesta = event.postback.payload;
    var response;

    console.log('ME LLEGO LA RESPUESTA: ' + respuesta);

    if ((respuesta === 'preg1_resp_si') || (respuesta === 'preg2_resp_si') || (respuesta === 'preg3_resp_si')
         || (respuesta === 'preg4_resp_si') || (respuesta === 'preg5_resp_si') || (respuesta === 'preg6_resp_si')
          || (respuesta === 'preg7_resp_si') || (respuesta === 'preg8_resp_si') || (respuesta === 'preg7_resp_si')) 
        {puntaje++;}
    else if ((respuesta === 'preg1_resp_nose') || (respuesta === 'preg2_resp_nose') || (respuesta === 'preg3_resp_nose')
         || (respuesta === 'preg4_resp_nose') || (respuesta === 'preg5_resp_nose') || (respuesta === 'preg6_resp_nose')
          || (respuesta === 'preg7_resp_nose') || (respuesta === 'preg8_resp_nose') || (respuesta === 'preg7_resp_nose')) 
        {puntaje=puntaje+0.5;}

    else if((respuesta === 'GET_STARTED') || (respuesta === 'otra_noticia')){
        pregunta=0;
        puntaje=0;
        response = askTemplatePreg1('Empecemos, ¿La noticia tiene un título muy intrigante, escrito en mayúsculas o con palabras llamativas?');
    }

    else if(respuesta==='gracias'){
        pregunta=0;
        puntaje=0;
        response = comeBackAskTemplate("Hasta la próxima!");
    }

    if (pregunta==1) {
        enviar_texto(senderID, askTemplatePreg2("¿La noticia es firmada por un periodista reconocido?"));
    }
    if (pregunta==2) {  
        enviar_texto(senderID, askTemplatePreg3("¿Conoces el sitio web que publica la noticia?"));
    }
    if (pregunta==3) {  
        enviar_texto(senderID, askTemplatePreg4("¿La noticia tiene errores de redacción o de ortografía?"));
    }
    if (pregunta==4) {  
        enviar_texto(senderID, askTemplatePreg5("¿La fecha de la noticia es real?"));
    }
    if (pregunta==5) {  
        enviar_texto(senderID, askTemplatePreg6("¿El lugar de la noticia es correcto?"));
    }
    if (pregunta==6) {  
        enviar_texto(senderID, askTemplatePreg7("¿La imagen de la noticia corresponde a lo que se cuenta?"));
    }
    if (pregunta==7) {  
        enviar_texto(senderID, askTemplatePreg8("¿Se citan las fuentes?"));
    }
    if (pregunta==8) {  
        enviar_texto(senderID, askTemplatePreg9("¿La noticia está compartida en otros sitios?"));
    }
    if (pregunta==9) {
        var resul;
        if (puntaje<=3)
            resul="Se puede asegurar con un alto nivel de certeza que la noticia es FALSA";
        else if (puntaje>3 && puntaje<=6)
            resul="No se puede asegurar que la noticia sea veraz o no";
        else if (puntaje>6 && puntaje<=9)
            resul="Se puede asegurar con un alto nivel de certeza que la noticia es VERAZ";

        enviar_texto(senderID, finalAskTemplate(resul));
    }


    else {
        pregunta++;
        enviar_texto(senderID, response);
    }    
}

// Funcion donde el chat respondera usando SendAPI
function enviar_texto(senderID, response){
    // Construccion del cuerpo del mensaje
    let request_body = {
        "recipient": {
          "id": senderID
        },
        "message": response
    }
    
    // Enviar el requisito HTTP a la plataforma de messenger
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Mensaje enviado!')
        } else {
          console.error("No se puedo enviar el mensaje:" + err);
        }
    }); 
}
