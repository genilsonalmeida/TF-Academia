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
import com.timedev.academia.model.Pagamento;
import com.timedev.academia.repository.PagamentoRepository;

@RestController
public class PagamentoController {

	@Autowired
	PagamentoRepository pagamentoRepository;
	
	@GetMapping("/pagamento")
	public Page<Pagamento> getPagamento(@Valid Pageable pageable){
		return pagamentoRepository.findAll(pageable);
	}
	
	@GetMapping("/pagamento/{idPagamento}")
	public Pagamento getOne(@Valid @PathVariable Integer idPagamento) {
		return pagamentoRepository.findById(idPagamento)
				.orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idPagamento));
	}
	
	@PostMapping("/pagamento")
	public Pagamento create(@Valid @RequestBody Pagamento pagamento) {
		return pagamentoRepository.save(pagamento);
	}
	
	@PutMapping("/pagamento/{idPagamento}")
	public Pagamento update(@PathVariable Integer idPagamento,
			@Valid @RequestBody Pagamento pagamentoRequest) {
		return pagamentoRepository.findById(idPagamento)
				.map(pagamento -> {
					pagamento.setValor(pagamentoRequest.getValor());
					pagamento.setDataDoPagamento(pagamentoRequest.getDataDoPagamento());
					pagamento.setDescricaoDoPagamento(pagamentoRequest.getDescricaoDoPagamento());
					return pagamentoRepository.save(pagamento);
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idPagamento));
				
	}
	
	@DeleteMapping("/pagamento/{idPagamento}")
	public ResponseEntity<?> delete(@PathVariable Integer idPagamento){
		return pagamentoRepository.findById(idPagamento)
				.map(pagamento -> {
					pagamentoRepository.delete(pagamento);
					return ResponseEntity.ok().build();
				}).orElseThrow(() -> new ResourceNotFoundException("página não encontrada " + idPagamento));
	}
	
}
