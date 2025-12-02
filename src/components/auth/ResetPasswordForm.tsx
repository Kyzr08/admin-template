"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";

export default function ResetPasswordForm() {
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Volver al Dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-3 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un
              enlace para restablecer tu contraseña.
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <Label>
                Correo electrónico <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="mt-2"
              />
            </div>
            <div>
              <Button className="w-full" size="sm">
                Enviar enlace de restablecimiento
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-sm text-gray-600 text-center dark:text-gray-400">
              ¿Recordaste tu contraseña? {""}
              <Link
                href="/signin"
                className="font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
