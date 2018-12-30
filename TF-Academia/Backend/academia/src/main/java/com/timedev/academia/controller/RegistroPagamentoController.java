package com.timedev.academia.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import com.timedev.academia.model.Pagamento;
import com.timedev.academia.model.RegistroPagamento;
import com.timedev.academia.repository.RegistroPagamentoRepository;
@CrossOrigin
@RestController
public class RegistroPagamentoController {

	@Autowired
	RegistroPagamentoRepository registroPagamentoRepository;

	@GetMapping("/registroPagamento")
	public Page<RegistroPagamento> getRegistroPagamento(@Valid Pageable pageable){
		return registroPagamentoRepository.findAll(pageable);
	}

	@GetMapping("/registroPagamento/{idRegistroPag}")
	public RegistroPagamento getOne(@Valid @PathVariable Integer idRegistroPag) {
		return registroPagamentoRepository.findById(idRegistroPag)
				.orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idRegistroPag));
	}

	@PostMapping("/registroPagamento")
	public RegistroPagamento create(@Valid @RequestBody RegistroPagamento rPagamento) {
		return registroPagamentoRepository.save(rPagamento);
	}

	@PutMapping("/registroPagamento/{idRegistroPag}")
	public RegistroPagamento update(@PathVariable Integer idRegistroPag,
			@Valid @RequestBody RegistroPagamento rPagamentoRequest) {
		return registroPagamentoRepository.findById(idRegistroPag)
				.map(rPagamento -> {
					rPagamento.setPagamentos(rPagamentoRequest.getPagamentos());
					return registroPagamentoRepository.save(rPagamento);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idRegistroPag));

	}

	@DeleteMapping("/registroPagamento/{idRegistroPag}")
	public ResponseEntity<?> delete(@PathVariable Integer idRegistroPag){
		return registroPagamentoRepository.findById(idRegistroPag)
				.map(rPagamento -> {
					registroPagamentoRepository.delete(rPagamento);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idRegistroPag));
	}

	@PostMapping("/registroPagamento/{idRegistroPag}/addPagamento")
	public RegistroPagamento adicionarPagamento(@PathVariable Integer idRegistroPag,
			@Valid @RequestBody Pagamento pagamento) {
		return registroPagamentoRepository.findById(idRegistroPag)
				.map(rPagamento -> {
					rPagamento.addPagamento(pagamento);
					return registroPagamentoRepository.save(rPagamento);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idRegistroPag));
	}

	@DeleteMapping("/registroPagamento/{idRegistroPag}/deletePagamento")
	public RegistroPagamento removerPagamento(@PathVariable Integer idRegistroPag,
			@Valid @RequestBody Pagamento pagamento) {
		return registroPagamentoRepository.findById(idRegistroPag)
				.map(rPagamento -> {
					rPagamento.removePagamento(pagamento.getId());
					return registroPagamentoRepository.save(rPagamento);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idRegistroPag));
	}
}
