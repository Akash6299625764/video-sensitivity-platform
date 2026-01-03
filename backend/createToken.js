import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    id: "65aa11112222333344445555",
    role: "editor",
  },
  "supersecretkey",
  { expiresIn: "1d" }
);

console.log(token);
