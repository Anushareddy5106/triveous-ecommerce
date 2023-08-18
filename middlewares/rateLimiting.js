const rateLimits = new Map();

const maxRequestsPerMinute = 10;
const tokensPerMinute = maxRequestsPerMinute;

function getTokenBucket(clientId) {
  if (!rateLimits.has(clientId)) {
    rateLimits.set(clientId, {
      tokens: tokensPerMinute,
      lastRefillTimestamp: Date.now(),
    });
  }
  return rateLimits.get(clientId);
}

function refillTokens(bucket) {
  const now = Date.now();
  const timeSinceLastRefill = now - bucket.lastRefillTimestamp;
  const tokensToAdd = Math.floor(
    (timeSinceLastRefill / 1000) * (tokensPerMinute / 60)
  );

  bucket.tokens = Math.min(bucket.tokens + tokensToAdd, tokensPerMinute);
  bucket.lastRefillTimestamp = now;
}

export const rateLimiting = async (req, res, next) => {
  const clientId = req.userId;

  const bucket = getTokenBucket(clientId);
  //   console.log(bucket);
  refillTokens(bucket);

  if (bucket.tokens > 0) {
    bucket.tokens--;
    // console.log("rate limit");
    next();
  } else {
    res.status(429).json({
      error: "Rate limit exceeded. Please wait and try again later.",
    });
  }
};
