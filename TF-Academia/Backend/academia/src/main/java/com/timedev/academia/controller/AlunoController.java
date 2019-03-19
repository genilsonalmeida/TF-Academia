package com.timedev.academia.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import com.timedev.academia.model.Aluno;
import com.timedev.academia.model.RegistroPagamento;
import com.timedev.academia.repository.AlunoRepository;
@CrossOrigin
@RestController
public class AlunoController {

	@Autowired
	AlunoRepository alunoRepository;
	
	
	@GetMapping("/aluno")
	public Page<Aluno> getAll(@Valid Pageable pageable){
		return alunoRepository.findAll(pageable);		
	}
	
	@GetMapping("/aluno/lista/{pageNumber}")
	public Page<Aluno> getSpecificPage(@Valid Pageable pageable,
			@PathVariable Integer pageNumber){
		pageable =  PageRequest.of(pageNumber, 10);
		return alunoRepository.findAll(pageable);
	}
		
	@GetMapping("/aluno/{idAluno}")
	public Aluno getOne(@Valid @PathVariable Integer idAluno) {
		return alunoRepository.findById(idAluno)
				.orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));		
	}
	
	@GetMapping("/aluno/buscarMatricula/{alunoMatricula}")
	public Aluno getAlunoByCpf(@Valid @PathVariable String alunoMatricula) {
		return alunoRepository.findByMatricula(alunoMatricula);
	}
	
	@GetMapping("/aluno/buscarNomeCelular/{alunoNome}/{alunoCelular}/{pageNumber}")
	public Page<Aluno> getByNomeCelular(@PathVariable String alunoNome, @PathVariable String alunoCelular,
		@PathVariable Integer pageNumber, Pageable pageable) {
		pageable =  PageRequest.of(pageNumber, 10);
		return alunoRepository.findByNomeOrNumeroCelular(alunoNome, alunoCelular, pageable);
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
					aluno.setMatricula(alunoRequest.getMatricula());
					aluno.setDataDeMatricula(alunoRequest.getDataDeMatricula());
					aluno.setDataDeNascimento(alunoRequest.getDataDeNascimento());
					aluno.setMensalidade(alunoRequest.getMensalidade());
					aluno.setDiaDoPagamento(alunoRequest.getDiaDoPagamento());
					aluno.setEndereco(alunoRequest.getEndereco());
					aluno.setRegistrosDePagamentos(alunoRequest.getRegistrosDePagamentos());
					aluno.setNumeroCelular(alunoRequest.getNumeroCelular());
					aluno.setNumeroCelularEmergencia(alunoRequest.getNumeroCelularEmergencia());
					
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
	@PostMapping("/aluno/{idAluno}/addRegistro")
	public Aluno adicionarPagamento(@PathVariable Integer idAluno,
			@Valid @RequestBody RegistroPagamento rPagamento) {
		return alunoRepository.findById(idAluno)
				.map(aluno -> {
					aluno.addRegistro(rPagamento);
					return alunoRepository.save(aluno);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));
	}

	@DeleteMapping("/aluno/{idAluno}/removerRegistro")
	public Aluno removerPagamento(@PathVariable Integer idAluno,
			@Valid @RequestBody RegistroPagamento rPagamento) {
		return alunoRepository.findById(idAluno)
				.map(aluno -> {
					aluno.removerRegistro(rPagamento.getId());
					return alunoRepository.save(aluno);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idAluno));
	}
	
	@GetMapping("/aluno/listaVencimento/{dataVencimento}")
	public Page<Aluno> getDataDeVencimento(@Valid @PathVariable String dataVencimento,
			Pageable pageable){
		return alunoRepository.findByDataVencimento(dataVencimento, pageable);
	}
@GetMapping("/aluno/retornarTotalDeMensalidadesEAlunos")
	public Page<Integer> getTotalMensalidadesETotalDeAlunos(Pageable pageable){
	    return	alunoRepository.getValorTotalMensalidadesAndCountOfAlunos(pageable); 
	 }

}
