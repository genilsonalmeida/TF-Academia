package com.timedev.academia.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.timedev.academia.exeption.ResourceNotFoundException;
import com.timedev.academia.model.Instrutor;
import com.timedev.academia.repository.InstrutorRepository;

@CrossOrigin
@RestController
public class InstrutorController {

	@Autowired
	InstrutorRepository instrutorRepository;
	
	@GetMapping("/instrutor")
	public Page<Instrutor> getAll(@Valid Pageable pageable){
		return instrutorRepository.findAll(pageable);		
	}
	
	@GetMapping("/instrutor/lista/{pageNunber}")
	public Page<Instrutor> getSpecificPage(@Valid Pageable pageable,
			@PathVariable Integer pageNunber){
		pageable = PageRequest.of(pageNunber, 5);
		return instrutorRepository.findAll(pageable);		
	}
	
	@GetMapping("/instrutor/{idInstrutor}")
	public Instrutor getOne(@Valid @PathVariable Integer idInstrutor) {
		return instrutorRepository.findById(idInstrutor)
				.orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idInstrutor));
				
	}
	
	@GetMapping("/instrutor/find-name/{nomeInstrutor}")
	public Page<Instrutor> getNomeInstrutor(@Valid @PathVariable String nomeInstrutor,
			@Valid Pageable pageable){
		return instrutorRepository.findByNome(nomeInstrutor,pageable);		
	}
	
	@PostMapping("/instrutor")
	public Instrutor save(@Valid @RequestBody Instrutor instrutor) {
		return instrutorRepository.save(instrutor);
	}
	
	@PutMapping("/instrutor/{idInstrutor}")
	public Instrutor update(@PathVariable Integer idInstrutor,
			@Valid 	@RequestBody Instrutor instrutorRequest) {
		return instrutorRepository.findById(idInstrutor)
				.map(instrutor -> {
					instrutor.setNome(instrutorRequest.getNome());
					instrutor.setSexo(instrutorRequest.getSexo());
					instrutor.setEmail(instrutorRequest.getEmail());
					instrutor.setCpf(instrutorRequest.getCpf());
					instrutor.setDataDeNascimento(instrutorRequest.getDataDeNascimento());
					instrutor.setEndereco(instrutorRequest.getEndereco());
					instrutor.setNumeroCelular(instrutorRequest.getNumeroCelular());
					instrutor.setNumeroCelularEmergencia(instrutorRequest.getNumeroCelularEmergencia());
					
					
					return instrutorRepository.save(instrutor);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idInstrutor));				
				
	}
	
	@DeleteMapping("/instrutor/{idInstrutor}")
	public ResponseEntity<?> delete(@Valid @PathVariable Integer idInstrutor){
		return instrutorRepository.findById(idInstrutor)
				.map(instrutor -> {
					instrutorRepository.delete(instrutor);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idInstrutor));

	}
	
}
