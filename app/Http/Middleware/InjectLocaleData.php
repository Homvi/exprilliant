<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\BrowserLanguageService;

class InjectLocaleData
{
    public function handle(Request $request, Closure $next): Response
    {
        $browserLanguageService = new BrowserLanguageService();
        $languageCode = $browserLanguageService->detectLanguage($request);

        // Specify the path to the language JSON files
        $localesPath = base_path('app/locales');
        $languageFilePath = "{$localesPath}/{$languageCode}.json";

        if (file_exists($languageFilePath)) {
            $data = json_decode(file_get_contents($languageFilePath), true);
        } else {
            // Fallback to English if the language file does not exist
            $englishFilePath = "{$localesPath}/en.json";
            $data = json_decode(file_get_contents($englishFilePath), true);
            $languageCode = 'en';
        }

        // Inject data into Inertia
        inertia()->share('localeData', [
            'data' => $data,
            'languageCode' => $languageCode,
        ]);

        return $next($request);
    }
}