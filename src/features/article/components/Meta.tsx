import React, { FC } from 'react';

import { Helmet } from 'react-helmet-async';

type Props = {
  slug?: string;
  title?: string;
  url?: string;
  author?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  publishedAt?: number;
  updatedAt?: number;
  keywords?: Array<string>;
};

const Meta: FC<Props> = ({
  title = '',
  url = '',
  description = '',
  author = '',
  image = '',
  imageAlt = '',
  publishedAt = '',
  updatedAt = '',
  keywords = [],
}) => {
  const publishedTime = publishedAt ? new Date(publishedAt).toISOString() : '';
  const modifiedTime = updatedAt ? new Date(updatedAt).toISOString() : '';

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      />
      <meta
        name='keywords'
        content={keywords?.join(',')}
      />

      <meta
        name='author'
        content={author}
      />
      <meta
        name='robots'
        content='index, follow, max-snippet-length=160, max-image-preview=large'
      />

      <link
        rel='canonical'
        href={url}
      />

      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:type'
        content='article'
      />
      <meta
        property='og:url'
        content={url}
      />
      <meta
        property='og:image'
        content={image}
      />
      <meta
        property='og:image:alt'
        content={imageAlt}
      />
      <meta
        property='og:site_name'
        content='jeanaica.com'
      />
      <meta
        property='article:published_time'
        content={publishedTime}
      />
      <meta
        property='article:modified_time'
        content={modifiedTime}
      />

      <meta
        property='og:locale'
        content='en_US'
      />

      <meta
        name='twitter:title'
        content={title}
      />
      <meta
        name='twitter:description'
        content={description}
      />
      <meta
        name='twitter:image'
        content={image}
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
    </Helmet>
  );
};

export default Meta;
