import React, { useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../action";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import Login, { LoginInterface } from "../../action/Auth/Login";
const LoginForm = ({
  dispatch,
  AuthPending,
  setShowPin,
}: {
  dispatch: AppDispatch;
  AuthPending: boolean;
  setShowPin: Function;
}) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("SignInToAccount")}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          {error && <span>{t("wrongData")}</span>}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="Username" className="sr-only">
                {t("Username")}
              </label>
              <input
                id="Username"
                name="Username"
                type="Username"
                autoComplete="Username"
                value={Username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required
                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("Username")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t("Password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={Password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t("Password")}
              />
            </div>
          </div>

          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(Login({ Username, Password })).then(({ payload }) => {
                  if ((payload as LoginInterface).work) {
                    setShowPin(true);
                  } else {
                    setError((payload as LoginInterface).error !== undefined);
                  }
                });
              }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Icon
                  className={
                    !AuthPending
                      ? "h-5 w-5 fill-current text-indigo-500 group-hover:text-indigo-400"
                      : "hidden"
                  }
                  Label="lock"
                />
                <Icon
                  className={
                    AuthPending
                      ? "animate-spin -ml-1 mr-3 h-5 w-5 fill-current text-indigo-500"
                      : "hidden"
                  }
                  Label="hour-glass"
                />
              </span>
              {t("Login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default connect(({ Auth }: RootState) => ({
  AuthPending: Auth.Pending,
}))(LoginForm);
