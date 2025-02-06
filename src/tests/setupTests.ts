import '@testing-library/jest-dom';

// Needed for the Router
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
