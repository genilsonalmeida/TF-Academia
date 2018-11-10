package com.timedev.academia.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.timedev.academia.exeption.ResourceNotFoundException;
import com.timedev.academia.model.Aluno;
import com.timedev.academia.repository.AlunoRepository;

@RestController
public class AlunoController {

	@Autowired
	AlunoRepository alunoRepository;
	
	@GetMapping("/aluno")
	public Page<Aluno> getAll(@Valid Pageable pageable){
		return alunoRepository.findAll(pageable);		
	}
	
	@GetMapping("/aluno/{idAluno}")
	public Aluno getOne(@Valid @PathVariable Integer idAluno) {
		return alunoRepository.findById(idAluno)
				.orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));
				
	}
	
	@PostMapping("/aluno")
	public Aluno save(@Valid @RequestBody Aluno aluno) {
		return alunoRepository.save(aluno);
	}
	
	@PutMapping("/aluno/{idAluno}")
	public Aluno update(@PathVariable Integer idAluno,
			@Valid 	@RequestBody Aluno alunoRequest) {
		return alunoRepository.findById(idAluno)
				.map(aluno -> {
					aluno.setNome(alunoRequest.getNome());
					aluno.setSexo(alunoRequest.getSexo());
					aluno.setEmail(alunoRequest.getEmail());
					aluno.setCpf(alunoRequest.getCpf());
					aluno.setDataDeMatricula(alunoRequest.getDataDeMatricula());
					aluno.setDataDeNascimento(alunoRequest.getDataDeNascimento());
					aluno.setMensalidade(alunoRequest.getMensalidade());
					aluno.setEndereco(alunoRequest.getEndereco());
					
					return alunoRepository.save(aluno);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));				
				
	}
	
	@DeleteMapping("/aluno/{idAluno}")
	public ResponseEntity<?> delete(@Valid @PathVariable Integer idAluno){
		return alunoRepository.findById(idAluno)
				.map(aluno -> {
					alunoRepository.delete(aluno);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));

	}
}
