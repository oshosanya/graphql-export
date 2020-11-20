const introspectionResult = require('../../../tests/utils/test_introspection_result.json');
const expectedConversionResult = require('./expected_conversion_result.json');
import Postman from '../../postman';

describe('Postman', function () {
  describe('#convert', function () {
    it('corretly generates a postman collection file', async function () {
      const result = (new Postman).convert(introspectionResult, 'http://localhost:3000', 'Query', 'Mutation')

      expect(JSON.parse(result)).toEqual(expectedConversionResult)
    })
  })
})
