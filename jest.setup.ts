import "@testing-library/jest-dom";

if (typeof global.fetch !== "function") {
  global.fetch = jest.fn();
}

if (typeof global.URL !== "function") {
  global.URL = jest.fn().mockImplementation((url) => ({
    toString: () => url,
    searchParams: new URLSearchParams(),
  })) as any;
}

if (typeof global.Headers !== "function") {
  global.Headers = jest.fn().mockImplementation(() => ({
    append: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    has: jest.fn(),
    set: jest.fn(),
    forEach: jest.fn(),
  }));
}

if (typeof global.Request !== "function") {
  global.Request = jest.fn().mockImplementation(() => ({
    clone: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
  }));
}

if (typeof global.Response !== "function") {
  global.Response = jest.fn().mockImplementation(() => ({
    clone: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
  })) as any;
}
