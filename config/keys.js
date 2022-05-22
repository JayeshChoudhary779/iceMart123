import dev from "./dev.js";
import prod from "./prod.js";

let key = {};
if (process.env.MONGOURI) {
  key = prod;
} else {
  key = dev;
}

export default key;
