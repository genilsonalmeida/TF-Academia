package com.timedev.academia.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.timedev.academia.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer>{
  public Aluno findByCpf(String cpf);
  public Page<Aluno> findByNomeOrNumeroCelular(String nome, String nCelular, Pageable pageable);
}
