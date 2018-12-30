package com.timedev.academia.model;

import java.time.LocalDate;

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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;



@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
public abstract class Pessoa {

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column
	@NotNull
	@NotEmpty(message="Nome deve ser informado")
	private String nome;
	
	@Column
	@NotEmpty(message="Cpf deve ser informado")
	private String cpf;

	@Column
	private LocalDate dataDeNascimento;
	
	@Column
	@NotEmpty(message="Sexo deve ser informado")
	private String sexo;
	
	@Column(unique = true)
	@NotEmpty(message="Email deve ser informado")
	private String email;
	
	@Embedded
	@AttributeOverrides(value= {
			@AttributeOverride(name = "cep", column = @Column(name = "cep_numero") ),
			@AttributeOverride(name = "numero", column = @Column(name = "casa_numero"))
	})
	private Endereco Endereco;

	@Column(unique = true, nullable=false)
	@NotEmpty(message="número de celular deve ser informado")
	private String numeroCelular;
	
	@Column(nullable = false)
	@NotEmpty(message="número de emergência deve ser informado")
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
