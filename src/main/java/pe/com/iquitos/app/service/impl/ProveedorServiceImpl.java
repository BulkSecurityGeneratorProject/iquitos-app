package pe.com.iquitos.app.service.impl;

import pe.com.iquitos.app.domain.ContactoProveedor;
import pe.com.iquitos.app.domain.CuentaProveedor;
import pe.com.iquitos.app.repository.ContactoProveedorRepository;
import pe.com.iquitos.app.repository.CuentaProveedorRepository;
import pe.com.iquitos.app.repository.search.ContactoProveedorSearchRepository;
import pe.com.iquitos.app.repository.search.CuentaProveedorSearchRepository;
import pe.com.iquitos.app.service.ProveedorService;
import pe.com.iquitos.app.domain.Proveedor;
import pe.com.iquitos.app.repository.ProveedorRepository;
import pe.com.iquitos.app.repository.search.ProveedorSearchRepository;
import pe.com.iquitos.app.service.dto.CuentaProveedorDTO;
import pe.com.iquitos.app.service.dto.ProveedorDTO;
import pe.com.iquitos.app.service.mapper.ContactoProveedorMapper;
import pe.com.iquitos.app.service.mapper.CuentaProveedorMapper;
import pe.com.iquitos.app.service.mapper.ProveedorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Proveedor.
 */
@Service
@Transactional
public class ProveedorServiceImpl implements ProveedorService {

    private final Logger log = LoggerFactory.getLogger(ProveedorServiceImpl.class);

    private final ProveedorRepository proveedorRepository;

    private final ProveedorMapper proveedorMapper;

    private final ProveedorSearchRepository proveedorSearchRepository;


    private final CuentaProveedorRepository cuentaProveedorRepository;
    private final CuentaProveedorMapper cuentaProveedorMapper;
    private final CuentaProveedorSearchRepository cuentaProveedorSearchRepository;

    private final ContactoProveedorRepository contactoProveedorRepository;
    private final ContactoProveedorMapper contactoProveedorMapper;
    private final ContactoProveedorSearchRepository contactoProveedorSearchRepository;

    public ProveedorServiceImpl(ProveedorRepository proveedorRepository, ProveedorMapper proveedorMapper, ProveedorSearchRepository proveedorSearchRepository,
                                CuentaProveedorRepository cuentaProveedorRepository, CuentaProveedorMapper cuentaProveedorMapper, CuentaProveedorSearchRepository cuentaProveedorSearchRepository,
                                ContactoProveedorRepository contactoProveedorRepository, ContactoProveedorMapper contactoProveedorMapper, ContactoProveedorSearchRepository contactoProveedorSearchRepository) {
        this.proveedorRepository = proveedorRepository;
        this.proveedorMapper = proveedorMapper;
        this.proveedorSearchRepository = proveedorSearchRepository;

        this.cuentaProveedorRepository = cuentaProveedorRepository;
        this.cuentaProveedorMapper = cuentaProveedorMapper;
        this.cuentaProveedorSearchRepository = cuentaProveedorSearchRepository;

        this.contactoProveedorRepository = contactoProveedorRepository;
        this.contactoProveedorMapper = contactoProveedorMapper;
        this.contactoProveedorSearchRepository = contactoProveedorSearchRepository;
    }

    /**
     * Save a proveedor.
     *
     * @param proveedorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProveedorDTO save(ProveedorDTO proveedorDTO) {
        log.debug("Request to save Proveedor : {}", proveedorDTO);

        proveedorDTO.getCuentaProveedors().forEach(cuentaProveedorDTO -> {
            CuentaProveedor cuentaProveedor = cuentaProveedorMapper.toEntity(cuentaProveedorDTO);
            cuentaProveedor = cuentaProveedorRepository.save(cuentaProveedor);
            cuentaProveedorSearchRepository.save(cuentaProveedor);
        });

        proveedorDTO.getContactoProveedors().forEach(contactoProveedorDTO -> {
            ContactoProveedor contactoProveedor = contactoProveedorMapper.toEntity(contactoProveedorDTO);
            contactoProveedor = contactoProveedorRepository.save(contactoProveedor);
            contactoProveedorSearchRepository.save(contactoProveedor);
        });

        Proveedor proveedor = proveedorMapper.toEntity(proveedorDTO);
        proveedor = proveedorRepository.save(proveedor);
        ProveedorDTO result = proveedorMapper.toDto(proveedor);
        proveedorSearchRepository.save(proveedor);
        return result;
    }

    /**
     * Get all the proveedors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProveedorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Proveedors");
        return proveedorRepository.findAll(pageable)
            .map(proveedorMapper::toDto);
    }

    /**
     * Get all the Proveedor with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<ProveedorDTO> findAllWithEagerRelationships(Pageable pageable) {
        return proveedorRepository.findAllWithEagerRelationships(pageable).map(proveedorMapper::toDto);
    }
    

    /**
     * Get one proveedor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProveedorDTO> findOne(Long id) {
        log.debug("Request to get Proveedor : {}", id);
        return proveedorRepository.findOneWithEagerRelationships(id)
            .map(proveedorMapper::toDto);
    }

    /**
     * Delete the proveedor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proveedor : {}", id);
        proveedorRepository.deleteById(id);
        proveedorSearchRepository.deleteById(id);
    }

    /**
     * Search for the proveedor corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProveedorDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Proveedors for query {}", query);
        return proveedorSearchRepository.search(queryStringQuery(query), pageable)
            .map(proveedorMapper::toDto);
    }
}
