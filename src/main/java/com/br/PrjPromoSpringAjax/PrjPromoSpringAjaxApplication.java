package com.br.PrjPromoSpringAjax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.br.PrjPromoSpringAjax.domain.SocialMetaTag;
import com.br.PrjPromoSpringAjax.service.SocialMetaTagService;

@SpringBootApplication
public class PrjPromoSpringAjaxApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PrjPromoSpringAjaxApplication.class, args);
	}

	@Autowired
	SocialMetaTagService service;
	
	@Override
	public void run(String... args) throws Exception {
		
		
		
	}

}
