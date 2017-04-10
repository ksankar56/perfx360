/**
 * Created by senthil on 04/04/17.
 */

var express = require('express')
    , router = express.Router()
    , elasticSearchService = require('../../service/elasticsearch/es.service')
    , Status = require('../../../src/common/domains/Status');

router.get('/mappings', elasticSearchService.executePerfx360IndexMappings);

module.exports = router;