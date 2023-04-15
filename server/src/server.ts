import App from './app';
import AuthenticationRoutes from "./Modules/authentication/authentication.routes";
import FinanceRoutes from "./Modules/finance/finance.routes";

export default class Server {
  private static app: App;
  public static port = 3000;

  public static getApp(): App {
    return this.app;
  }

  public static async close() {
    await this.getApp().close().then(async () => {
      await this.app.close()
    });
  }

  public static async init() {
    if (!this.app) {
      this.app = new App(
        (app: App) => {
          return [
            new AuthenticationRoutes(app),
            new FinanceRoutes(app),
          ]
        },
        this.port,
      );
    }

    await this.app.init();
    return this.app
  }
}
