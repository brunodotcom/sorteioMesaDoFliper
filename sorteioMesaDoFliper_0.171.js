//Script para captar texto de dentro do Chat do Youtube

var chaves = new Array();  // isso isso isso ...
var quantidadeChaves;
var participantes = new Array(); //MatriX de participantes
var Intervalo;

function configuraChaves(){
	//Solicita o número de Hashtags que serão utilizadas	
	var tentativas = 0;
  //Enquanto o usuário não digitar um número válido, o sistema fica tentando
	while(isNaN(quantidadeChaves) || quantidadeChaves == ''){
		if(tentativas > 0){
			alert('Número inválido');
		}
		quantidadeChaves = parseInt(prompt('Digite o número de Chaves', ''));
    tentativas++;		
	}
  //Caso o usuário cancele, para a função
  if(quantidadeChaves==null){  	
  	return false;
  }
	
	//Através do número de chaves, cria-se um laço para configurar quais palavras serão buscadas
	var mensagemConfirmacao = '';	  
	for(var i = 0; i <= quantidadeChaves-1; i++) {  	
		while(chaves[i] == '' || typeof chaves[i]  == 'undefined'){
			chaves[i] = prompt('Digite a chave nº' + (i+1) + ' que deseja ser buscada', '');
			if(chaves[i] == '' || chaves[i] == null){
				alert('Chave nº'+ (i+1) +' está vazia! Digite novamente');
			}
		}
		mensagemConfirmacao += 'Chave nº'+ (i+1) +' : ' + chaves[i] + ' \n';    
	}
	
	//Pede confirmação do usuário para as chaves configuradas
	return confirm('Confirme as chaves abaixo : \n \n' + mensagemConfirmacao);
}

function carregaJQuery(){
	//Carrega o Jquery necessário para execução do script
	javascript:void((function(){j=document.createElement("SCRIPT");j.src="https://code.jquery.com/jquery-latest.pack.js";document.getElementsByTagName("HEAD")[0].appendChild(j);})());
}


function buscarChaves(){
	for(var i = 0; i <= chaves.length-1; i++) {  	
		//Cria a página de exibição dos participantes
		novaPagina = window.open(" ", "Sorteio Mesa do Fliper "+ chaves[i] ) ;
		novaPagina.document.open();
		novaPagina.document.write("<html>");
		novaPagina.document.write("<head><title>Sorteio Mesa do Fliper</title></head>");
		novaPagina.document.write("<body><h1>Participantes do sorteio : "+chaves[i]+"</h1>");
		
		if(typeof participantes[i]  == 'undefined'){
			participantes[i] = new Array();
		}
		
		//Le a página de comentários da live do Youtube para achar os participantes com a chave correta
		$('.yt-live-chat-text-message-renderer').find("#message").each(
			function( y ) { 
				//Procura a chave no comentário do usuário
				if($(this).text().toLowerCase().indexOf(chaves[i]) >= 0){
					var participante = $(this).parent().find("#author-name").text().trim();				
					if(participantes[i].indexOf(participante) < 0){					
						participantes[i][participantes[i].length] =participante;
						
					}
					
				} 
			}
		);

		for (y = 0, len = participantes[i].length; y < len; y++) {
			novaPagina.document.write("<h3>"+(y+1)+"# "+participantes[i][y]+"</h3>");
		}
		
		novaPagina.document.write("</body></html>");
		novaPagina.document.close();
	}	
}
function ativaBusca(){
	//Executa a função depois de 1 segundo para evitar erros
	Intervalo = setInterval(function(){
		buscarChaves();
	}, 20000);
}

if(!configuraChaves()){
	alert('Configuração cancelada pelo usuário!');
}
else{
	carregaJQuery();
	ativaBusca();
}


