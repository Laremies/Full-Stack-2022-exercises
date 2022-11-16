const testHelper = require('../utils/test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = testHelper.dummy(blogs)
    expect(result).toBe(1)
})