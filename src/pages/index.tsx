import styles from "@/styles/Home.module.css";
import { trpc } from "../utils/trpc";
import { NextPage } from "next";
import { useUserContext } from "../context/user.context";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

const Home: NextPage = () => {
  const user = useUserContext();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <Link href="/posts/new">Create post</Link>
    </div>
  );
};

export default Home;
