package com.timedev.academia.model;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@DiscriminatorValue("IN")
public class Instrutor extends Pessoa{

	@GeneratedValue
	@Id
	private Integer id;	
	
	
	public Instrutor() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
}
