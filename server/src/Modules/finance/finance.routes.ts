import Router from "../../core/routers";
import App from "../../app";
import FinanceController from './finance.controller';
import ValidatorMiddleware from "../../middlewares/validator";
import AuthMiddleware from "../../middlewares/auth";

class FinanceRoutes extends Router {
  public path = '/finance';
  public controller = new FinanceController();
  public validatorMiddleware = new ValidatorMiddleware();
  public authMiddleware = new AuthMiddleware();
  private _app;

  constructor(app: App) {
    super();
    this._app = app;
    this.initRouters();
  }
 
  public initRouters() {
    this.router.post(this.path.concat('/send-money'),
      [
        this.authMiddleware.checkToken,
        this.authMiddleware.verifyAuth,
        this.validatorMiddleware.validateInputs
      ],
      this.controller.SendMoney.bind(this));
  }
}

export default FinanceRoutes;
