import { useCallback, useState } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useGenerateCaptchaToken } from '@/auth/hooks/useGenerateCaptchaToken';
import { useNavigateAfterSignInUp } from '@/auth/sign-in-up/hooks/useNavigateAfterSignInUp.ts';
import { Form } from '@/auth/sign-in-up/hooks/useSignInUpForm.ts';
import { AppPath } from '@/types/AppPath';
import { PageHotkeyScope } from '@/types/PageHotkeyScope';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import { useInsertCaptchaScript } from '~/hooks/useInsertCaptchaScript';
import { useIsMatchingLocation } from '~/hooks/useIsMatchingLocation';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

import { useAuth } from '../../hooks/useAuth';

export enum SignInUpMode {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
}

export enum SignInUpStep {
  Init = 'init',
  Email = 'email',
  Password = 'password',
}

export const useSignInUp = (form: UseFormReturn<Form>) => {
  const { enqueueSnackBar } = useSnackBar();

  const isMatchingLocation = useIsMatchingLocation();

  const workspaceInviteHash = useParams().workspaceInviteHash;

  const { navigateAfterSignInUp } = useNavigateAfterSignInUp();

  const [isInviteMode] = useState(() => isMatchingLocation(AppPath.Invite));

  const [signInUpStep, setSignInUpStep] = useState<SignInUpStep>(
    SignInUpStep.Init,
  );

  const [signInUpMode, setSignInUpMode] = useState<SignInUpMode>(() => {
    return isMatchingLocation(AppPath.SignInUp)
      ? SignInUpMode.SignIn
      : SignInUpMode.SignUp;
  });

  const {
    signInWithCredentials,
    signUpWithCredentials,
    checkUserExists: { checkUserExistsQuery },
  } = useAuth();

  const isCaptchaScriptLoaded = useInsertCaptchaScript();
  const { generateCaptchaToken } = useGenerateCaptchaToken();

  const [isGeneratingCaptchaToken, setIsGeneratingCaptchaToken] =
    useState(false);

  const getCaptchaToken = useCallback(async () => {
    setIsGeneratingCaptchaToken(true);
    const captchaToken = await generateCaptchaToken(isCaptchaScriptLoaded);
    setIsGeneratingCaptchaToken(false);
    if (!isUndefinedOrNull(captchaToken)) {
      form.setValue('captchaToken', captchaToken);
    }
    return captchaToken;
  }, [form, generateCaptchaToken, isCaptchaScriptLoaded]);

  const continueWithEmail = useCallback(() => {
    setSignInUpStep(SignInUpStep.Email);
    setSignInUpMode(
      isMatchingLocation(AppPath.SignInUp)
        ? SignInUpMode.SignIn
        : SignInUpMode.SignUp,
    );
  }, [setSignInUpStep, setSignInUpMode, isMatchingLocation]);

  const continueWithCredentials = useCallback(() => {
    if (!form.getValues('email')) {
      return;
    }
    checkUserExistsQuery({
      variables: {
        email: form.getValues('email').toLowerCase().trim(),
        captchaToken: form.getValues('captchaToken'),
      },
      onCompleted: (data) => {
        if (data?.checkUserExists.exists) {
          setSignInUpMode(SignInUpMode.SignIn);
        } else {
          setSignInUpMode(SignInUpMode.SignUp);
        }
        setSignInUpStep(SignInUpStep.Password);
      },
    });
  }, [form, checkUserExistsQuery]);

  const submitCredentials: SubmitHandler<Form> = useCallback(
    async (data) => {
      try {
        if (!data.email || !data.password) {
          throw new Error('Email and password are required');
        }

        const {
          workspace: currentWorkspace,
          workspaceMember: currentWorkspaceMember,
        } =
          signInUpMode === SignInUpMode.SignIn && !isInviteMode
            ? await signInWithCredentials(
                data.email.toLowerCase().trim(),
                data.password,
                data.captchaToken,
              )
            : await signUpWithCredentials(
                data.email.toLowerCase().trim(),
                data.password,
                workspaceInviteHash,
                data.captchaToken,
              );

        navigateAfterSignInUp(currentWorkspace, currentWorkspaceMember);
      } catch (err: any) {
        enqueueSnackBar(err?.message, {
          variant: 'error',
        });
      }
    },
    [
      signInUpMode,
      isInviteMode,
      signInWithCredentials,
      signUpWithCredentials,
      workspaceInviteHash,
      navigateAfterSignInUp,
      enqueueSnackBar,
    ],
  );

  useScopedHotkeys(
    'enter',
    async () => {
      if (signInUpStep === SignInUpStep.Init) {
        continueWithEmail();
      }

      if (signInUpStep === SignInUpStep.Email) {
        continueWithCredentials();
      }

      if (signInUpStep === SignInUpStep.Password) {
        await getCaptchaToken();
        form.handleSubmit(submitCredentials)();
      }
    },
    PageHotkeyScope.SignInUp,
    [
      continueWithEmail,
      signInUpStep,
      continueWithCredentials,
      form,
      submitCredentials,
    ],
  );

  return {
    isInviteMode,
    signInUpStep,
    signInUpMode,
    continueWithCredentials,
    continueWithEmail,
    submitCredentials,
    getCaptchaToken,
    isGeneratingCaptchaToken,
  };
};
