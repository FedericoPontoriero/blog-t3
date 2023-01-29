import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm();

  const { mutate, error } = trpc.useMutation(["users.register-user"]);

  return (
    <>
      <form></form>

      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
