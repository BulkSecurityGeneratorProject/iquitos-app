package pe.com.iquitos.app.service.impl;

import pe.com.iquitos.app.service.PurchaseService;
import pe.com.iquitos.app.domain.Purchase;
import pe.com.iquitos.app.repository.PurchaseRepository;
import pe.com.iquitos.app.repository.search.PurchaseSearchRepository;
import pe.com.iquitos.app.service.dto.PurchaseDTO;
import pe.com.iquitos.app.service.mapper.PurchaseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Purchase.
 */
@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PurchaseServiceImpl.class);

    private PurchaseRepository purchaseRepository;

    private PurchaseMapper purchaseMapper;

    private PurchaseSearchRepository purchaseSearchRepository;

    public PurchaseServiceImpl(PurchaseRepository purchaseRepository, PurchaseMapper purchaseMapper, PurchaseSearchRepository purchaseSearchRepository) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseMapper = purchaseMapper;
        this.purchaseSearchRepository = purchaseSearchRepository;
    }

    /**
     * Save a purchase.
     *
     * @param purchaseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PurchaseDTO save(PurchaseDTO purchaseDTO) {
        log.debug("Request to save Purchase : {}", purchaseDTO);

        Purchase purchase = purchaseMapper.toEntity(purchaseDTO);
        purchase = purchaseRepository.save(purchase);
        PurchaseDTO result = purchaseMapper.toDto(purchase);
        purchaseSearchRepository.save(purchase);
        return result;
    }

    /**
     * Get all the purchases.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PurchaseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Purchases");
        return purchaseRepository.findAll(pageable)
            .map(purchaseMapper::toDto);
    }


    /**
     * Get one purchase by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PurchaseDTO> findOne(Long id) {
        log.debug("Request to get Purchase : {}", id);
        return purchaseRepository.findById(id)
            .map(purchaseMapper::toDto);
    }

    /**
     * Delete the purchase by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);
        purchaseRepository.deleteById(id);
        purchaseSearchRepository.deleteById(id);
    }

    /**
     * Search for the purchase corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PurchaseDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Purchases for query {}", query);
        return purchaseSearchRepository.search(queryStringQuery(query), pageable)
            .map(purchaseMapper::toDto);
    }
}
