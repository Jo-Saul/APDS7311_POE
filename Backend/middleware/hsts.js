//function to enforce HTTPS connection
function hsts(req, res, next)
{
    if (req.secure)
    {
        res.setHeader(
            'Strict-Transport-Security',
            'max-age=31536000; includesSubDomains; preload'
        )
    }
    next();
}

module.exports = hsts;