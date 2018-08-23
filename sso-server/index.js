const app = require("./app");
const PORT = 3010;

app.listen(PORT, () => {
  console.info(`sso-server listening on port ${PORT}`);
});
