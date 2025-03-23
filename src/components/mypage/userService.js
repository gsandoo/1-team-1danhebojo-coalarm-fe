import axios from "axios";
import store from "../../redux/store"; // Redux 스토어 import

const BASE_URL = "http://localhost:8080/api/v1";

// API 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 설정 (Redux 스토어에서 토큰 가져와서 추가)
api.interceptors.request.use(
  (config) => {
    // Redux 스토어에서 현재 상태 가져오기
    const state = store.getState();
    // state.user.token에서 토큰 가져오기 (Redux 스토어 구조에 맞게 조정 필요)
    const token = state.user.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 사용자 서비스 객체
const userService = {
  // 사용자 정보 조회
  getUserInfo: async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 사용자 프로필 업데이트
  updateProfile: async (profileData) => {
    try {
      const formData = new FormData();

      // FormData에 데이터 추가
      if (profileData.nickname) {
        formData.append("nickname", profileData.nickname);
      }

      if (profileData.profileImage) {
        formData.append("profileImage", profileData.profileImage);
      }

      const response = await api.patch("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 회원 탈퇴
  withdrawUser: async () => {
    try {
      const response = await api.delete("/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
