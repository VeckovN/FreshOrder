import {rateLimit, ipKeyGenerator} from 'express-rate-limit';
const getKey = ipKeyGenerator();

const rateLimitHandler = (req, res) => {
    res.status(429).json({
        message:"Too many requests, Please try again later.", //client expects 'status and message'
        retryAfter: Math.ceil(req.rateLimit.resetTime / 1000) 
    })
}

//Authentication rate limiter
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many registration attempts. Please try again after 15 minutes.',
    //we want to read req.rateLimit.resetTime to set up the 'retryAfter' so it must be put in headers
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: rateLimitHandler,
    keyGenerator: getKey
})

// Login rate limiter (slightly more lenient than register)
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 8,
    message: 'Too many login attempts. Please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: getKey
});

export const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, 
    message: 'Too many token refresh attempts. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: getKey
});

//General API READ operations limiter
export const apiReadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests. Please slow down.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: getKey
}) 

export const apiWriteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15m
    max: 50,
    message: 'Too many requests. Please slow down',
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: getKey
})

export const healthLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, 
    max: 30,
    message: 'Too many health check requests.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    keyGenerator: getKey
})
