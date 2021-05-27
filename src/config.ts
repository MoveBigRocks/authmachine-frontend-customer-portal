const developmentMode = process.env.NODE_ENV === "development";
let basePrefix = process.env.REACT_APP_ADMIN_CONSOLE_PATH_PREFIX;
basePrefix = basePrefix ? `/${basePrefix}` : "";

export const configEnv = {
  originUrl: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "",
  adminConsoleUrl: `${developmentMode ? "http://localhost:4000" : ""}/admin-console${basePrefix}`,
  adminConsoleDeprecated: `${developmentMode ? "http://localhost:3000" : ""}/admin/dashboard`
};
