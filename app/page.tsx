import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Landing from "./components/Landing";
import Home from "./components/Home";

export default async function Root() {
    const session = await getServerSession(authOptions);
    return <>{session ? <Home /> : <Landing />}</>;
}
