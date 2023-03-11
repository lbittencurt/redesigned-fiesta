import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should returns the literal '0' when partitionKey is a string", () => {
    const partitionKey = "partitionKey";
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe("0");
  });

  it("should returns the literal '0' when event not contains partitionKey", () => {
    const trivialKey = deterministicPartitionKey({ a: 'abc' });
    expect(trivialKey).toBe("0");
  });

  it("should returns the literal '10' when event contains partitionKey with an number 10", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 10 });
    expect(trivialKey).toBe("10");
  });

  it("should returns object when candidate length is less than 256", () => {
    const mockData = Array.from({length: 10}, (x, i) => faker.name.fullName());
    
    const expectedKey = crypto.createHash("sha3-512")
      .update(JSON.stringify(mockData))
      .digest("hex");

    const trivialKey = deterministicPartitionKey({ partitionKey: mockData });
    expect(trivialKey).toBe(JSON.stringify(mockData));
  });

  it("should returns hash when candidate length is higher than 256", () => {
    const mockData = Array.from({length: 20}, (x, i) => faker.name.fullName());
    
    const expectedKey = crypto.createHash("sha3-512")
      .update(JSON.stringify(mockData))
      .digest("hex");

    const trivialKey = deterministicPartitionKey({ partitionKey: mockData });
    expect(trivialKey).toBe(expectedKey);
  });
});
