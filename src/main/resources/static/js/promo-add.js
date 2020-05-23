//funcao para capturar metatags
$("#linkPromocao").on('change', function(){	
	var url = $(this).val();
	console.log(url);
	if(url.length > 7) {
		
		$.ajax({
			method:"POST",
			url: "/meta/info?url=" + url,
			cache: false,
			beforeSend: function(){
				$("#alert").removeClass("alert alert-danger").text('');
				$("#titulo").val("");
				$("#site").text("");
				$("#linkImagem").attr("src","");
				$("#loader-img").addClass("loader");
			},
			success: function( data ){
				console.log(data);
				//val refere-se ao input html
				$("#titulo").val(data.title);		
				$("#site").text(data.site.replace("@",""));
				//attr é um metodo do Jquery; o primeiro param é o atributo da tag q vamos acessar; o segundo é o valor da objeto da classe
				$("#linkImagem").attr("src", data.image);
			},
			statusCode: {
				404: function(){
					$("#alert").addClass("alert alert-danger").text("Nenhuma informação pode ser recuperada desta url.");
					$("#linkImagem").attr("src","/images/promo-dark.png");
				}
			},
			error: function(){
				  	$("#alert").addClass("alert alert-danger").text("Ops...algo deu errado, tente mais tarde.");
				  	$("#linkImagem").attr("src","/images/promo-dark.png");
			},
			complete: function(){
				$("#loader-img").removeClass("loader");
			}
		});		
	}	
});