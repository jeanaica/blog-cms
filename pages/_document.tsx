import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <title>CMS Demo</title>
        <meta
          property='og:title'
          content='CMS Demo by Jeanaica'
        />

        <meta
          name='image'
          property='og:image'
          content='https://demo-cms.jeanaica.com/logo.png'
        />
        <meta
          name='publish_date'
          property='og:publish_date'
          content='2022-12-22T00:00:00-0000'
        />
        <meta
          property='og:url'
          content='https://demo-cms.jeanaica.com'
        />
        <meta
          name='description'
          property='og:description'
          content='CMS Demo by Jeanaica using NextJS, ReactJS, TailwindCSS, NodeJS, Typescript. Blog content management system that can add, edit, update blog posts and comments.'
        />
        <meta
          name='author'
          content='Jeanaica Suplido'
        />
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
