import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import { LocalizedText } from '@/types/locale';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false
  });

  const { localeData } = usePage<{ localeData: { data: LocalizedText } }>().props;
  const { login_page } = localeData.data;

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <CustomGuestLayout>
      <GuestLayout>
        <Head title={login_page.title} />

        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="email" value={login_page.email_label} />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              onChange={(e: { target: { value: string } }) => setData('email', e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value={login_page.password_label} />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={(e: { target: { value: string } }) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e: { target: { checked: boolean } }) => setData('remember', e.target.checked)}
              />
              <span className="ms-2 text-sm text-gray-600">{login_page.remember_me}</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {login_page.forgot_password}
              </Link>
            )}

            <PrimaryButton className="ms-4" disabled={processing}>
              {login_page.login_button}
            </PrimaryButton>
          </div>
        </form>
      </GuestLayout>
    </CustomGuestLayout>
  );
}
