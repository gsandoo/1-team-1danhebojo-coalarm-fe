import axiosInstance from './axios';

const userApi = {
  //디스코드 웹훅 URL 연동
  connectDiscord: (webHookUrl) => {
    return axiosInstance.patch('/users/discord', {
      web_hook_url: webHookUrl
    });
  },

  //회원 정보 수정
  updateUserProfile: (userData) => {
    const formData = new FormData();
    
    if (userData.nickname) {
      formData.append('nickname', userData.nickname);
    }
    
    if (userData.profileImage) {
      formData.append('profile_image', userData.profileImage);
    }
    
    return axiosInstance.patch('/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  //회원 탈퇴
  deleteAccount: () => {
    return axiosInstance.delete('/user');
  },

  //로그아웃

  logout: () => {
    return axiosInstance.post('/user/logout');
  },

};

export default userApi;