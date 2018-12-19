package com.timedev.academia.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.timedev.academia.model.Instrutor;

@Repository
public interface InstrutorRepository extends JpaRepository<Instrutor,Integer>{
 
	Page<Instrutor> findByNome(String nome, Pageable pageable);
	
}
