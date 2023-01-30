import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";

function LoginPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>{error && error.message}</form>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="test@example.com"
        {...register("email")}
      />
      <br />
      <input type="text" placeholder="test" {...register("name")} />
      <button type="submit">Register</button>
      <Link href="/register">Register</Link>
    </>
  );
}

export default LoginPage;
