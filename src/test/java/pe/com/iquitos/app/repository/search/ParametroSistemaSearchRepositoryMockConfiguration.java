package pe.com.iquitos.app.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ParametroSistemaSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ParametroSistemaSearchRepositoryMockConfiguration {

    @MockBean
    private ParametroSistemaSearchRepository mockParametroSistemaSearchRepository;

}
