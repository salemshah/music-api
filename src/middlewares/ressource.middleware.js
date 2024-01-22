const asyncHandler = require("../helper/asyncHandler")
const request = require("../helper/request")

const validate = (schema) => asyncHandler((req, res, next) => {
    const validationErrors = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params
    })

    if (validationErrors.success) {
        request.setArgs(req, res, next)
        return next()
    }

    // if not valid resource
    request.setArgs(null, null, null)
    res.status(400).send(validationErrors);
});

module.exports = validate;
