package com.timedev.academia.model;


import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Pagamento {
    @Id
    @GeneratedValue
	private Integer id;
	
    @Column
    private Double valor;
    
    @Column
    private LocalDate dataDoPagamento = LocalDate.now();
    
    @Column
    private String descricaoDoPagamento;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public LocalDate getDataDoPagamento() {
		return dataDoPagamento;
	}

	public void setDataDoPagamento(LocalDate dataDoPagamento) {
		this.dataDoPagamento = dataDoPagamento;
	}

	public String getDescricaoDoPagamento() {
		return descricaoDoPagamento;
	}

	public void setDescricaoDoPagamento(String descricaoDoPagamento) {
		this.descricaoDoPagamento = descricaoDoPagamento;
	}
    
    
}
