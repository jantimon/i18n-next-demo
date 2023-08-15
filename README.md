## i18n-next-demo

This POC shows how translations can be automatically split into chunks and loaded on demand.

### How to run

```bash
npm install
npm run dev
```

### How it works

The `dictionary.i18n` file contains all the translations for the app. It is a simple JSON file with a key-value structure:

```json
 {
    "Welcome {name}": {
        "de-CH": "Willkommen zu {name}!",
        "en-US": "Welcome to {name}!",
        "fr-CH": "Bienvenue à {name}!",
        "it-CH": "Benvenuto a {name}!",
        "nl-NL": "Welkom bij {name}!"
    }
 }
```

The custom SWC plugin @galaxus/swc-plugin-translation-importer searches for `__` calls in the source code and replaces them with a direct import to the translation. The import will be processed by a webpack loader to split the translations automatically.

```js
__('greeting');

// becomes

import __i18n_FEE456 from './dictionary.i18n?__i18n_FEE456';
__(__i18n_FEE456)
```

This will allow webpack to split the translations into chunks and load them on demand.  
During optimization, webpack will even inline the translation if it is used only once:

```js
__(['Welcome', 'Willkommen']);
```

### Advantages

- no manual splitting of translations
- automatic unused translation removal
- splitting per page
- lazy loaded js chunks automatically lazy load their translations
- translation keys are removed during build time
- translations used in RSC are not transferred to the client
- compiles ICU messages to JS during build time

### Inline Code Example

In the following example you can see that only the translations without any translation keys are transferred to the client:

![inline code example](https://raw.githubusercontent.com/jantimon/i18n-next-demo/master/i18n-demo.jpg)