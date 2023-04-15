declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: any;
      DB_DATABASE: string;
      DB_HOST: string;
      DB_DIALECT: string;
      DB_SSL_REQUIRE: any;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}
export { }