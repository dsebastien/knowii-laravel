/**
 * Meta
 */
export const BUILD_TIME = new Date().toISOString();
export const BUILD_TIMESTAMP = Date.now();

/**
 * Utils
 */
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';

/**
 * URLs
 */
export const HOME_URL = '/';
export const LOGIN_URL = 'login';
export const REGISTER_URL = 'register';
export const DASHBOARD_URL = 'dashboard';

/**
 * API
 */
export const API_BASE_PATH = '/api/v1';
