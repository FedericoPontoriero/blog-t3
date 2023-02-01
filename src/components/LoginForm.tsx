mport Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";
import { useState } from "react";

function VerifyToken(hash: string) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);
  if (isLoading) {
    return <p>Verfying...</p>;
  }
  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");
  return <p>Redirecting...</p>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(...values, redirect: router.asPath);
  }

  const hash = router.asPath.split("#token=")[1];
  if (hash) {
    return <VerifyToken hash />;
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

export default LoginForm;
