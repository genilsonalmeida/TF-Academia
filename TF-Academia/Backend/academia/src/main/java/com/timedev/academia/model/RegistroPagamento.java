package com.timedev.academia.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Null;

@Entity
public class RegistroPagamento {
    @Id
    @GeneratedValue
	private Integer id;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pagamento> pagamentos = new ArrayList<Pagamento>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Pagamento> getPagamentos() {
		return pagamentos;
	}

	public void setPagamentos(List<Pagamento> pagamentos) {
		this.pagamentos.clear();
		this.pagamentos.addAll(pagamentos);
	}
	
	public void addPagamento(Pagamento pagamento) {
		this.pagamentos.add(pagamento);
	}
	
	public void removePagamento(Integer id) {
		Pagamento recebePagamento = null;
		
		for (Pagamento pagamento : pagamentos) {
			if(pagamento.getId() == id) {
				recebePagamento = pagamento;				
			}
		}
		pagamentos.remove(recebePagamento);
	}
	
    
}
