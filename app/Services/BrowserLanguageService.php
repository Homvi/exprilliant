<?php

// app/Services/BrowserLanguageService.php

namespace App\Services;

use Illuminate\Http\Request;

class BrowserLanguageService
{
    public function detectLanguage(Request $request): string
    {
        // Get the preferred languages from the browser
        $preferredLanguages = $request->getLanguages();

        // The first language in the array is usually the preferred language
        $browserLanguage = reset($preferredLanguages);

        // Use a regular expression to extract only the language code
        if ($browserLanguage !== false && preg_match('/^([a-z]+)/i', $browserLanguage, $matches)) {
            $languageCode = strtolower($matches[1]);

            return $languageCode;
        }

        // Default fallback
        return 'en';
    }
}
