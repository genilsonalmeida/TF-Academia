package com.timedev.academia.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.lang.NonNull;


@Entity
@DiscriminatorValue("AL")
public class Aluno extends Pessoa{

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column
	@NonNull
	private Double mensalidade;
	
	@Column
	@NonNull
	private LocalDateTime dataDeMatricula;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RegistroPagamento> registrosDePagamentos = new ArrayList<RegistroPagamento>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getMensalidade() {
		return mensalidade;
	}

	public void setMensalidade(Double mensalidade) {
		this.mensalidade = mensalidade;
	}

	public LocalDateTime getDataDeMatricula() {
		return dataDeMatricula;
	}

	public void setDataDeMatricula(LocalDateTime dataDeMatricula) {
		this.dataDeMatricula = dataDeMatricula;
	}

	public List<RegistroPagamento> getRegistrosDePagamentos() {
		return registrosDePagamentos;
	}

	public void setRegistrosDePagamentos(List<RegistroPagamento> registrosDePagamentos) {
		this.registrosDePagamentos.clear();
		this.registrosDePagamentos.addAll(registrosDePagamentos);
	}
	
	public void addRegistro(RegistroPagamento rPagamento) {
		this.registrosDePagamentos.add(rPagamento);
	}
	
	public void removerRegistro(Integer id) {
		RegistroPagamento recebeRegistro = null;
		for (RegistroPagamento registroPagamento : registrosDePagamentos) {
			if(registroPagamento.getId() == id) {
				recebeRegistro = registroPagamento; 
			}
		}
		
		registrosDePagamentos.remove(recebeRegistro);
	}
		
	
}
