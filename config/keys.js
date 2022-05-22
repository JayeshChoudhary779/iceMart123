import dev from "./dev";
import prod from "./prod";

let key = {};

if (process.env.NODE_ENV == "production") {
  key = prod;
} else {
  key = dev;
}

export default key;
