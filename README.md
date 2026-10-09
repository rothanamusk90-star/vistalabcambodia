# VistaLab Cambodia Website

## Open and run the website

1. Open a terminal in this project folder.
2. Install dependencies if this is the first run:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal. It is usually <http://localhost:5173>.
5. To stop the server, press `Ctrl+C` in the terminal.

## Build and preview

- Check TypeScript and create a production build:

  ```bash
  npm run build
  ```

  The production files are created in the `dist/` folder.

- Preview the production build on your computer:

  ```bash
  npm run preview
  ```

  Open the local URL printed in the terminal.

## Source layout

```text
vistalab/
  App.tsx                    Main app and page views
  main.tsx                   React entry point
  styles.css                 Global and responsive styles
  components/                Shared UI components
    CountryFlag.tsx
    ImageUpload.tsx
    Modal.tsx
  data/
    siteData.ts              Initial brands, products, news, and hubs
    translations.ts          English and Khmer copy
  utils/
    storage.ts               Browser storage helper
index.html                   Vite HTML shell
public/images/               Static image assets
```

The demo CMS stores edits in the current browser's local storage. Changes do not automatically sync to other browsers or devices.
