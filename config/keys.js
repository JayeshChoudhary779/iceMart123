import dev from "./dev.js";
import prod from "./prod.js";

let key = {};
if (process.env.NODE_ENV == "production") {
  key = prod;
} else {
  key = dev;
}

export default key;
