import mundo from '../../assets/animations/mundo.json';
import { useLottie } from 'lottie-react';
import { Head, usePage } from '@inertiajs/react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import JumboButton from '@/Components/JumboButton';
import { LocalizedText } from '@/Types/locale';
import { User } from '@/Types';

const Home = () => {
  // lottie animation configuration
  const options = {
    animationData: mundo,
    loop: true
  };

  // language content
  const { localeData, auth } = usePage<{ localeData: { data: LocalizedText }; auth: { user: User | null } }>().props;
  const { home_page } = localeData.data;
  const { user } = auth;

  // lottie animation
  const { View } = useLottie(options);

  return (
    <>
      <Head title="Welcome" />
      <CustomGuestLayout>
        <div className="px-2 text-2xl min-h-screen flex flex-col md:flex-row items-center font-nova">
          <div className="flex my-11 md:w-[40%] justify-center h-full">
            {/* lottie animation */}
            {View}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-center w-full max-w-md">{home_page.title}</h2>
            <div className="flex my-9 flex-col gap-3 w-full md:w-[70%] text-center">
              <JumboButton href="/choose-game-mode" content={home_page.get_started} />
              {!user && <JumboButton className="bg-midnight" href="/login" content={home_page.login} />}
              {user && (
                <JumboButton
                  className="bg-midnight"
                  href="/request-new-expression"
                  content={home_page.request_new_expression}
                />
              )}
              <span className="text-base text-midnight/30">{home_page.explanation}</span>
            </div>
          </div>
        </div>
      </CustomGuestLayout>
    </>
  );
};

export default Home;
