package com.timedev.academia.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.sun.javafx.beans.IDProperty;

@Entity
@DiscriminatorValue("AL")
public class Aluno extends Pessoa{

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column
	private Double mensalidade;
	
	@Column
	private LocalDateTime dataDeMatricula;

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
		
	
}
