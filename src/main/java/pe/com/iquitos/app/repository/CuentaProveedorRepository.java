package pe.com.iquitos.app.repository;

import pe.com.iquitos.app.domain.CuentaProveedor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CuentaProveedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuentaProveedorRepository extends JpaRepository<CuentaProveedor, Long> {

}
