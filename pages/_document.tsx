import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&family=Montserrat:ital,wght@0,400;0,500;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
                <script
                    async
                    defer
                    src="https://www.fbgcdn.com/embedder/js/ewm2.js"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
