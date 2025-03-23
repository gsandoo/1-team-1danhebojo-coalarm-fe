import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  
  // HTTPS 비활성화 여부 확인
  const disableHttps = env.VITE_DISABLE_HTTPS === "true"
  
  const serverConfig = {
    port: 3000
  }
  
  // HTTPS 비활성화되지 않았을 때만 인증서 설정 추가
  if (!disableHttps) {
    try {
      // 인증서 파일이 존재하는지 확인
      const keyPath = path.resolve(__dirname, 'cert/localhost-key.pem')
      const certPath = path.resolve(__dirname, 'cert/localhost.pem')
      
      if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        serverConfig.https = {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath)
        }
      } else {
        console.warn('HTTPS 인증서 파일을 찾을 수 없습니다. HTTP로 실행합니다.')
      }
    } catch (error) {
      console.error('HTTPS 설정 중 오류 발생:', error)
    }
  }
  
  return {
    plugins: [react()],
    server: serverConfig,
    // 기타 설정...
  }
})