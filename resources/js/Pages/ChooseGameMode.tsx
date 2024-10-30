import es from '../../assets/es.svg';
import en from '../../assets/en.svg';
import hu from '../../assets/hu.svg';
import { Head, usePage } from '@inertiajs/react';
import CustomGuestLayout from '../Layouts/CustomGuestLayout';
import LanguageCard from '@/Components/LanguageCard';
import { LocalizedText } from '@/Types/locale';

const ChooseLanguage = () => {
  // get language content
  const { localeData, expressionCounts } = usePage<{
    localeData: { data: LocalizedText };
    expressionCounts: {
      'es-en': number;
      'en-es': number;
      'en-hu': number;
    };
  }>().props;
  const { choose_game_mode_page } = localeData.data;

  // TODO: Add dynamic title according to language

  return (
    <CustomGuestLayout>
      <Head title="Choose game mode" />

      <div className="min-h-screen font-nova bg-[#052138] text-white p-3 flex flex-col text-2xl">
        <div className="text-center my-6">
          <h1>{choose_game_mode_page.choose_language_title}</h1>
        </div>

        {/* Language cards container*/}
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {/* Spanish to English card */}
          <LanguageCard
            questionFlag={es}
            answerFlag={en}
            gameMode="es-en"
            text={choose_game_mode_page.spanish_to_english}
            questionFlagAltText="Spanish flag"
            answerFlagAltText="English flag"
            count={expressionCounts['es-en']}
          />
          {/* English to Spanish card */}
          <LanguageCard
            questionFlag={en}
            answerFlag={es}
            gameMode="en-es"
            text={choose_game_mode_page.english_to_spanish}
            questionFlagAltText="English flag"
            answerFlagAltText="Spanish flag"
            count={expressionCounts['en-es']}
          />
          {/* English to Hungarian card */}
          <LanguageCard
            questionFlag={en}
            answerFlag={hu}
            gameMode="en-hu"
            text={choose_game_mode_page.english_to_hungarian}
            questionFlagAltText="English flag"
            answerFlagAltText="Hungarian flag"
            count={expressionCounts['en-hu']}
          />
        </div>
      </div>
    </CustomGuestLayout>
  );
};

export default ChooseLanguage;
