import app from "./app";
import config from "./app/config";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(
        `Template express application by mukto is running in  ${config.port}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
