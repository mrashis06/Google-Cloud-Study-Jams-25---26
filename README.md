# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Development

This project fetches leaderboard data from a public Google Sheet. To run the project locally, you'll need to provide the URL to your own Google Sheet.

1.  **Create a `.env.local` file** in the root of the project.
2.  **Add your Google Sheet URL** to this file. The sheet must be publicly accessible and in CSV format. You can get this link from Google Sheets by going to `File > Share > Publish to web`, selecting "Comma-separated values (.csv)" and publishing it.

    ```
    NEXT_PUBLIC_SPREADSHEET_URL="YOUR_GOOGLE_SHEET_CSV_URL_HERE"
    ```

3.  Run the development server:

    ```bash
    npm run dev
    ```
