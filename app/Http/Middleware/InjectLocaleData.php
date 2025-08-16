<?php

namespace App\Http\Middleware;

use App\Services\BrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectLocaleData
{
    public function handle(Request $request, Closure $next): Response
    {
        $browserLanguageService = new BrowserLanguageService;
        $languageCode = $browserLanguageService->detectLanguage($request);

        // Specify the path to the language JSON files
        $localesPath = base_path('app/locales');
        $languageFilePath = "{$localesPath}/{$languageCode}.json";

        if (file_exists($languageFilePath)) {
            $fileContents = file_get_contents($languageFilePath);
            $data = $fileContents !== false ? json_decode($fileContents, true) : [];
        } else {
            // Fallback to English if the language file does not exist
            $englishFilePath = "{$localesPath}/en.json";
            $fileContents = file_get_contents($englishFilePath);
            $data = $fileContents !== false ? json_decode($fileContents, true) : [];
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
