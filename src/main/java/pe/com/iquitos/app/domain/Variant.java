package pe.com.iquitos.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Variant.
 */
@Entity
@Table(name = "variant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "variant")
public class Variant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price_sell")
    private Double priceSell;

    @Column(name = "prive_purchase")
    private Double privePurchase;

    @OneToMany(mappedBy = "variant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Variant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Variant description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPriceSell() {
        return priceSell;
    }

    public Variant priceSell(Double priceSell) {
        this.priceSell = priceSell;
        return this;
    }

    public void setPriceSell(Double priceSell) {
        this.priceSell = priceSell;
    }

    public Double getPrivePurchase() {
        return privePurchase;
    }

    public Variant privePurchase(Double privePurchase) {
        this.privePurchase = privePurchase;
        return this;
    }

    public void setPrivePurchase(Double privePurchase) {
        this.privePurchase = privePurchase;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Variant products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Variant addProduct(Product product) {
        this.products.add(product);
        product.setVariant(this);
        return this;
    }

    public Variant removeProduct(Product product) {
        this.products.remove(product);
        product.setVariant(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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
        Variant variant = (Variant) o;
        if (variant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), variant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Variant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", priceSell=" + getPriceSell() +
            ", privePurchase=" + getPrivePurchase() +
            "}";
    }
}
