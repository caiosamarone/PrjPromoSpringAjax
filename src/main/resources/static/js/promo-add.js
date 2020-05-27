//submit do formulario para o controller
$("#form-add-promo").submit(function(evt)
{
	evt.preventDefault();
	
	var promo = {};
	promo.linkPromocao = $("#linkPromocao").val();
	promo.descricao = $("#descricao").val();
	promo.preco = $("#preco").val();
	promo.titulo = $("#titulo").val();
	promo.categoria = $("#categoria").val();
	promo.linkImagem = $("#linkImagem").attr("src");
	promo.site = $("#site").text();
	
	console.log('teste promocao');
	console.log('promo > ', promo);
	
	$.ajax({
		method:"POST",
		url: "/promocao/save",
		data: promo, 
		beforeSend: function(){
			$("#form-add-promo").hide();
			$("#loader-form").addClass("loader").show();
		},
		success: function(){
			$("#form-add-promo").each(function(){
				this.reset();
			});
			$("#linkImagem").attr("src","/images/promo-dark.png");
			$("#site").text("");
			$("#alert").addClass("alert alert-success").text("OK! Promocao cadastrada com sucesso.");
		},
		error: function(xhr){
			console.log("> error ", xhr.responseText);
			$("#alert").addClass("alert alert-danger").text("Não foi possivel salvar esta promoção");
		},
		complete: function(){
			$("#loader-form").fadeOut(800, function(){
				$("#form-add-promo").fadeIn(250);
				$("#loader-form").removeClass("loader");
			})
		}
	})
});


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
				$("#alert").removeClass("alert alert-danger alert-success").text('');
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