import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

// Polyfill TextEncoder
global.TextEncoder = TextEncoder;

// Polyfill TextDecoder with a cast to handle type mismatch
global.TextDecoder = NodeTextDecoder as unknown as typeof global.TextDecoder;
