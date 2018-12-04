package com.timedev.academia.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
public abstract class Pessoa {

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column
	private String nome;
	
	@Column
	private String cpf;

	@Column
	private LocalDate dataDeNascimento;
	
	@Column
	private String sexo;
	
	@Column(unique = true)	
	private String email;
	
	@Embedded
	@AttributeOverrides(value= {
			@AttributeOverride(name = "cep", column = @Column(name = "cep_numero") ),
			@AttributeOverride(name = "numero", column = @Column(name = "casa_numero"))
	})
	private Endereco Endereco;

	@Column
	private String numeroCelular;
	
	@Column(nullable = false)
	private String numeroCelularEmergencia;
	
	public Pessoa() {
		// TODO Auto-generated constructor stub
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public LocalDate getDataDeNascimento() {
		return dataDeNascimento;
	}

	public void setDataDeNascimento(LocalDate dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public Endereco getEndereco() {
		return Endereco;
	}

	public void setEndereco(Endereco endereco) {
		Endereco = endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumeroCelular() {
		return numeroCelular;
	}

	public void setNumeroCelular(String numeroCelular) {
		this.numeroCelular = numeroCelular;
	}

	public String getNumeroCelularEmergencia() {
		return numeroCelularEmergencia;
	}

	public void setNumeroCelularEmergencia(String numeroCelularEmergencia) {
		this.numeroCelularEmergencia = numeroCelularEmergencia;
	}
		
	
	
}
