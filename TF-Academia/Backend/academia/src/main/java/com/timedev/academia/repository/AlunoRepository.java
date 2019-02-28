package com.timedev.academia.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.timedev.academia.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer>{
  public Aluno findByMatricula(String matricula);
  
  @Query(value = "select * from pessoa where  nome  like :nome% or numero_celular=:nCelular",
		  nativeQuery = true)
  public Page<Aluno> findByNomeOrNumeroCelular(
		 @Param("nome") String nome, 
		 @Param("nCelular") String nCelular, 
		  Pageable pageable);

  @Query( value = "select * from pessoa where tipo='AL' and dia_do_pagamento<=?1",
		  nativeQuery = true)
  public Page<Aluno> findByDataVencimento(String dataVencimento, Pageable pageable);
}