<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <UCard v-if="authMode === 'login'" class="auth-form w-80 mt-[-10vh]">
      <UCardHeader>
        <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      </UCardHeader>
      <UForm
        @submit="handleLogin"
        :state="state"
        :validate="validate"
        class="space-y-4"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Mot de passe" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UButton type="submit" block>Se connecter</UButton>
      </UForm>
      <div class="mt-4 text-center">
        <a
          href="#"
          @click.prevent="authMode = 'forgot'"
          class="text-primary-500 hover:underline"
          >Mot de passe oublié ?</a
        >
      </div>
    </UCard>

    <UCard v-if="authMode === 'forgot'" class="auth-form w-80 mt-[-10vh]">
      <h2 class="text-2xl font-bold mb-4">Réinitialisation du mot de passe</h2>
      <UForm @submit="handleForgotPassword" :state="state" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UButton type="submit" block
          >Envoyer le lien de réinitialisation</UButton
        >
      </UForm>
      <div class="mt-4 text-center">
        <a
          href="#"
          @click.prevent="authMode = 'login'"
          class="text-primary-500 hover:underline"
          >Retour à la connexion</a
        >
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
// Middleware pour les utilisateurs non connectés
definePageMeta({
  middleware: ["auth"],
});

import { object, string, type InferType } from "yup";
import type { FormError, FormErrorEvent, FormSubmitEvent } from "#ui/types";

const supabase = useSupabaseClient();

const authMode = ref("login");

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Veuillez entrer votre email" });
  if (!state.password)
    errors.push({
      path: "password",
      message: "Veuillez entrer votre mot de passe",
    });
  return errors;
};

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password,
    });
    if (error) throw error;
    navigateTo("/dashboard");
  } catch (error) {
    alert((error as Error).message);
  }
};

const handleForgotPassword = async (event: FormSubmitEvent<Schema>) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      event.data.email
    );
    if (error) throw error;
    alert("Vérifiez votre email pour réinitialiser votre mot de passe");
  } catch (error) {
    alert((error as Error).message);
  }
};

if (useSupabaseUser().value) {
  navigateTo("/dashboard");
}
</script>
