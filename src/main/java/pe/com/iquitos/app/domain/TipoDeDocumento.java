package pe.com.iquitos.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TipoDeDocumento.
 */
@Entity
@Table(name = "tipo_de_documento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tipodedocumento")
public class TipoDeDocumento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 150)
    @Column(name = "nombre", length = 150, nullable = false)
    private String nombre;

    @Column(name = "cantidad_digitos")
    private Double cantidadDigitos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoDeDocumento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getCantidadDigitos() {
        return cantidadDigitos;
    }

    public TipoDeDocumento cantidadDigitos(Double cantidadDigitos) {
        this.cantidadDigitos = cantidadDigitos;
        return this;
    }

    public void setCantidadDigitos(Double cantidadDigitos) {
        this.cantidadDigitos = cantidadDigitos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoDeDocumento tipoDeDocumento = (TipoDeDocumento) o;
        if (tipoDeDocumento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoDeDocumento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoDeDocumento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", cantidadDigitos=" + getCantidadDigitos() +
            "}";
    }
}
