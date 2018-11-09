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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.timedev.academia.exeption.ResourceNotFoundException;
import com.timedev.academia.model.Usuario;
import com.timedev.academia.repository.UsuarioRepository;

@RestController
public class UsuarioController {

	@Autowired 
	UsuarioRepository usuarioRepository;
	
	@GetMapping("/usuario")
	public Page<Usuario> getUsuario(@Valid Pageable pageable){
		return usuarioRepository.findAll(pageable);
	}
	
	@GetMapping("/usuario/{usuarioId}")
	public Usuario getOneUsuario(@Valid @PathVariable Integer usuarioId) {
		return usuarioRepository.findById(usuarioId)
				.orElseThrow(() -> new ResourceNotFoundException(" Página não encontrada " + usuarioId));
	}
	
	@PostMapping("/usuario")
	public Usuario createUsuario(@Valid @RequestBody Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
    
	@PostMapping("/usuario/{usuarioId}")
	public Usuario update( @PathVariable Integer usuarioId,
			@Valid @RequestBody Usuario usuarioRequest) {
		return usuarioRepository.findById(usuarioId)
				.map(usuario -> {
					usuario.setNome(usuarioRequest.getNome());
					usuario.setEmail(usuarioRequest.getEmail());
					usuario.setSenha(usuarioRequest.getSenha());
					usuario.setMatricula(usuarioRequest.getMatricula());
					
					return usuarioRepository.save(usuario);
				}).orElseThrow(() -> new ResourceNotFoundException(" Página não encontrada " 
					+ usuarioId));

	}
	
	@DeleteMapping("/usuario/{usuarioId}")
	public ResponseEntity<?> delete(@Valid @PathVariable Integer usuarioId) {
		return usuarioRepository.findById(usuarioId)
				.map(usuario -> {
				
					usuarioRepository.delete(usuario);
					return ResponseEntity.ok().build(); 
					
				}).orElseThrow(() -> new ResourceNotFoundException(" Página não encontrada " + usuarioId));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
