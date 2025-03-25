import axiosInstance from "./axios.jsx";

const alertApi = {
    /**
     * 사용자의 알람에 설정된 코인 목록을 조회합니다.
     * @param - 없음
     * @returns {Promise} API 응답
     */
    getMyAlertCoins: () => {
        return axiosInstance.request({
            method: 'GET',
            url: `/coins/alerts/me`
        });
    },
    // src/api/alertApi.js
    getAlerts: (params) => {
        return axiosInstance.request({
            method: 'GET',
            url: '/alerts',
            params,
        });
    },
    deleteAlert: (alertId) => {
        return axiosInstance.request({
            method: 'DELETE',
            url: `/alerts/${alertId}`
        })
    },
    updateAlertActive: (alertId, data) => {
        return axiosInstance.request({
            method: 'PATCH',
            url: `/alerts/${alertId}/status`,
            data: data
        })
    }
};

export default alertApi;