package com.timedev.academia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.timedev.academia.model.RegistroPagamento;

@Repository
public interface RegistroPagamentoRepository extends JpaRepository<RegistroPagamento, Integer>{

}
