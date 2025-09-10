import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

// same function body
export { handler as GET, handler as POST };
