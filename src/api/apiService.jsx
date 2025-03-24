import api from './axios';

// API 서비스 객체
const apiService = {
  // GET 요청
  get: async (url, params = {}) => {
    try {
      return await api.get(url, { params });
    } catch (error) {
      console.error(`GET ${url} 요청 실패:`, error);
      throw error;
    }
  },

  // POST 요청
  post: async (url, data = {}, config = {}) => {
    try {
      return await api.post(url, data, config);
    } catch (error) {
      console.error(`POST ${url} 요청 실패:`, error);
      throw error;
    }
  },

  // PUT 요청
  put: async (url, data = {}) => {
    try {
      return await api.put(url, data);
    } catch (error) {
      console.error(`PUT ${url} 요청 실패:`, error);
      throw error;
    }
  },

  // DELETE 요청
  delete: async (url, params = {}) => {
    try {
      return await api.delete(url, { params });
    } catch (error) {
      console.error(`DELETE ${url} 요청 실패:`, error);
      throw error;
    }
  },

  // PATCH 요청
  patch: async (url, data = {}) => {
    try {
      return await api.patch(url, data);
    } catch (error) {
      console.error(`PATCH ${url} 요청 실패:`, error);
      throw error;
    }
  }
};

export default apiService;