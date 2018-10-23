package pe.com.iquitos.app.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PaymentType entity.
 */
public class PaymentTypeDTO implements Serializable {

    private Long id;

    private String value;

    private String metaData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getMetaData() {
        return metaData;
    }

    public void setMetaData(String metaData) {
        this.metaData = metaData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentTypeDTO paymentTypeDTO = (PaymentTypeDTO) o;
        if (paymentTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentTypeDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", metaData='" + getMetaData() + "'" +
            "}";
    }
}
