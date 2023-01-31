import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";
import { useState } from "react";

function LoginPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>{error && error.message}</form>
      {success && <p>Check your email</p>}
      <h1>Login</h1>
      <input
        type="email"
        placeholder="test@example.com"
        {...register("email")}
      />
      <button>Login</button>
      <br />
      <input type="text" placeholder="test" {...register("name")} />
      <button type="submit">Register</button>
      <Link href="/register">Register</Link>
    </>
  );
}

export default LoginPage;
