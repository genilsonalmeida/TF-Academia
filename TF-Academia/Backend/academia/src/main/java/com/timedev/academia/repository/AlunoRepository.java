package com.timedev.academia.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.timedev.academia.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer>{
  public Aluno findByMatricula(String matricula);
  public Page<Aluno> findByNomeOrNumeroCelular(String nome, String nCelular, Pageable pageable);

  @Query( value = "select * from pessoa where tipo='AL' and dia_do_pagamento<=?1",
		  nativeQuery = true)
  public Page<Aluno> findByDataVencimento(String dataVencimento, Pageable pageable);
}
