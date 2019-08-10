var img = document.getElementById("pokeImg");
var perdeu = document.getElementById("perdeu");
var nome = document.getElementById("pokeNome");
var nomeTipo1 = document.getElementById("nomeTipo1");
var nomeTipo2 = document.getElementById("nomeTipo2");
var pts = document.getElementById("pontos");
var ls = localStorage;
var tipo1 = tipo2 = "";
var pokeNome = "?";
var banidos = [412, 413, 421, 487, 492, 585, 586, 641, 642, 647, 648, 718, 720, 741, 745, 746, 774, 778]
var pontos = 0;
var prosseguir = false;

function gerarAleatorio(min, max){
    do{
        var random = Math.floor(Math.random() * (max - min)) + min;
        var igual = false;
        for(i = 0; i < banidos.length;i++){
            if(random == banidos[i]){
                igual = true;
                break;
            }
        }
    }while(igual != false);
    return random;
}

var aleatorio = gerarAleatorio();

function urlImg(pokeNum){
    return "https://pokeres.bastionbot.org/images/pokemon/" + pokeNum + ".png";
}

$(document).ready(
    function(){ 
        console.log("Jogo carregado");
    },
    $.fn.pokeGenerate = function(num){
        var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + num;
        $.getJSON(pokeURL, function(poke){
            pokeNome = poke.name.charAt(0).toUpperCase() + poke.name.slice(1, this.length);
            console.log(num);
            console.log(pokeNome);
            if(poke.types.length == 1){
                console.log(poke.types[0].type.name);
                tipo1 = poke.types[0].type.name;
                tipo2 = "";
            }
            else{
                if(poke.types[0].slot == 1){
                    tipo1 = poke.types[0].type.name;
                    tipo2 = poke.types[1].type.name;
                    //console.log(tipo1);
                    //console.log(tipo2);    
                }
                else{
                    tipo1 = poke.types[1].type.name;  
                    tipo2 = poke.types[0].type.name;
                    //console.log(tipo1);
                    //console.log(tipo2);
                }
            }
            
            img.src = urlImg(num);
        });
    },
    $("#pokeButton").click(function(){
        var escolha1 = document.getElementById("tipo1").value;
        var escolha2 = document.getElementById("tipo2").value;
        
        nome.innerHTML = pokeNome;
        nomeTipo1.innerHTML = tipo1.charAt(0).toUpperCase() + tipo1.slice(1, this.length);
        if(tipo2 != "?"){
            nomeTipo2.innerHTML = tipo2.charAt(0).toUpperCase() + tipo2.slice(1, this.length);
        }
        else {
            nomeTipo2,innerHTML = tipo2;
        }
        
        
        if(escolha1 == tipo1 && escolha2 == tipo2){
            //alert("PARABÉNS! Você acertou o tipo do pokémon " + pokeNome + "!");    
            img.style.borderColor = "#6bff42";
            pontos++;
            pts.innerHTML = pontos;
            prosseguir = true;
        }
        else{
            //alert("Não foi dessa vez :(");
            //alert("PERDESTE! Pontuação final: " + pontos);
            perdeu.innerHTML = "PERDESTE! Pontuação final: " + pontos;
            perdeu.style.display = "block";
            img.style.borderColor = "#ff4242";
            pontos = 0;
            prosseguir = true;
        }

        

        $('#pokeImg').click(function(){
            if(prosseguir == true){
                img.style.borderColor = "#171B1E"; 
                if(perdeu.innerHTML != ""){
                    perdeu.innerHTML = "";
                    perdeu.style.display = "none";
                    pts.innerHTML = pontos;    
                }
                nome.innerHTML = "?";
                nomeTipo1.innerHTML = "?";
                nomeTipo2.innerHTML = "?";
                img.src = "loading.gif";
                $.fn.pokeGenerate(gerarAleatorio(1, 807));
                prosseguir = false;
            }
        });              
    })
);

$(document).ready(
    function(){
        $.fn.pokeGenerate(gerarAleatorio(1, 807))
    });