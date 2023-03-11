
import * as crypto from 'crypto';

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const CRYPTO_HASH = "sha3-512"
const CRYPTO_DIGEST = "hex"

function handleEventAndPartitionKey(event) {
  if (event && event.partitionKey) {
    return event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    return crypto.createHash(CRYPTO_HASH).update(data).digest(CRYPTO_DIGEST);
  }
  return undefined
}

function handleCandidateDataType(candidate) {
  if (candidate && typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  return TRIVIAL_PARTITION_KEY
}

function handleCandidateLength(candidate) {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash(CRYPTO_HASH).update(candidate).digest(CRYPTO_DIGEST);
  }
  return candidate
}

export function deterministicPartitionKey(event) {
  const candidate = handleCandidateDataType(handleEventAndPartitionKey(event))
  return handleCandidateLength(candidate)
}