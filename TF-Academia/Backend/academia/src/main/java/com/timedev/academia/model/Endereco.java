package com.timedev.academia.model;

import javax.persistence.Embeddable;
import javax.validation.constraints.Size;

import org.springframework.lang.NonNull;

@Embeddable
public class Endereco {
    @NonNull
    @Size(max = 15)
	private String cep;
	
    @NonNull
    @Size(max = 20)
    private String rua;
	
    
    @Size(max = 10)
    private String numero;
	
    @NonNull
    @Size(max = 10)
    private String cidade;
	
    @NonNull
    @Size(max = 15)
    private String bairro;
	
    @NonNull
    @Size(max = 2)
    private String uf;
    
    public Endereco() {
		// TODO Auto-generated constructor stub
	}
    
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getRua() {
		return rua;
	}
	public void setRua(String rua) {
		this.rua = rua;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}
	
	
	
}
