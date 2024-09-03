import { Box, Container, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { BlogPostMeta, Loader, PageHeader } from '@knowii/client-ui';
import { mdxComponents } from '@knowii/client-ui';
import { Layout } from '../../components/layout/layout';
import { getImageSize, getMdx, getMdxFilePaths, MdxEntry } from '@knowii/server';
import { LocaleCode, SITE_AUTHOR_MICRODATA, WebsiteDataType } from '@knowii/common';
import { i18nConfig } from '../../../../i18n.config.mjs';
import { useTranslations } from 'next-intl';
import { CustomPageProps } from '../_app';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line  @typescript-eslint/no-var-requires
const siteAuthor = require('../../metadata.json').author;
// eslint-disable-next-line  @typescript-eslint/no-var-requires
const siteAuthorAvatar = require('../../metadata.json').avatars.sebastien;
// eslint-disable-next-line  @typescript-eslint/no-var-requires
const siteAuthorLink = require('../../metadata.json').social.twitterSebastien;

interface MdxFilePathParams extends ParsedUrlQuery {
  slug: string;
}

interface Params {
  params: MdxFilePathParams;
  locale: LocaleCode;
}

export const getStaticPaths: GetStaticPaths<MdxFilePathParams> = async (_ctx) => {
  const mdxFilePaths = await getMdxFilePaths({
    type: WebsiteDataType.BLOG,
    locales: i18nConfig.i18n.locales as LocaleCode[],
  });

  const paths: Params[] = [];

  const postsMap: Map<string, LocaleCode[]> = new Map<string, LocaleCode[]>();
  mdxFilePaths.forEach((filePath) => {
    // Add if the slug is not there yet
    if (!postsMap.has(filePath.slug)) {
      // FIXME For now we just add all posts with all languages, simulating the availability
      // This is because we want all posts to be listed in all languages, we don't want to only show french posts for people using the French
      postsMap.set(filePath.slug, i18nConfig.i18n.locales as LocaleCode[]);
      //postsMap.set(filePath.slug, [filePath.locale]);
      return;
    }

    // The slug is already there, adding the locale
    // const currentLocalesForPost = postsMap.get(filePath.slug)!;
    // if (!currentLocalesForPost.includes(filePath.locale)) {
    //   currentLocalesForPost.push(filePath.locale);
    // }
  });

  postsMap.forEach((localesForPost, slug) => {
    localesForPost.forEach((localeForPost) => {
      paths.push({
        params: {
          slug,
        },
        locale: localeForPost,
      });
    });
  });

  console.log('getStaticPaths: ', paths);

  return {
    paths,
    fallback: false,
  };
};

type BlogPostPageProps = MdxEntry;

export const getStaticProps: GetStaticProps<Partial<CustomPageProps> & BlogPostPageProps, MdxFilePathParams> = async (ctx) => {
  const slug = ctx.params?.['slug'] as string;
  const locale: LocaleCode = ctx.locale ? (ctx.locale as LocaleCode) : (i18nConfig.i18n.defaultLocale as LocaleCode);

  console.log(`Loading MDX for slug [${slug}] with locale [${locale}]`);
  let mdx = await getMdx({ type: WebsiteDataType.BLOG, slug, locale });

  if (!mdx && locale !== i18nConfig.i18n.defaultLocale) {
    console.log(
      `Could not find the post [${slug}] with locale [${locale}]. Loading it with the default locale: [${i18nConfig.i18n.defaultLocale}]`,
    );
    mdx = await getMdx({ type: WebsiteDataType.BLOG, slug, locale: i18nConfig.i18n.defaultLocale as LocaleCode });
  }

  if (!mdx) {
    console.log(`Could not find the post [${slug}]. Redirecting to blog home`);
    return {
      notFound: true,
    };
  }

  // Get cover image size
  const image = mdx?.frontMatter.image;
  if (image) {
    const imageSize = getImageSize({ imagePath: image });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    mdx!.frontMatter.imageDetails = {
      width: imageSize?.width ?? 1,
      height: imageSize?.height ?? 1,
      src: image,
    };
  }

  const messages = (await import(`../../../../libs/common/src/lib/messages/${locale}.json`)).default;

  const retVal = {
    props: {
      messages,
      ...mdx,
      // Note that when `now` is passed to the app, you need to make sure the
      // value is updated from time to time, so relative times are updated. See
      // https://next-intl-docs.vercel.app/docs/usage/configuration#global-now-value
      now: new Date().getTime(),
    },
  };

  return retVal;
};

/**
 * Renders a specific blog post
 * @constructor
 */
export function BlogPostPage({ mdxSource, frontMatter }: BlogPostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  } else if (!frontMatter || !mdxSource) {
    return <ErrorPage statusCode={404} />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('blogPostPage');

  const pageTitle = frontMatter.title ? `${frontMatter.title} - ${t('blog')}` : t('blog'); // FIXME change title
  const metaImage = frontMatter.imageDetails?.src ?? null;

  const author = frontMatter.author ?? siteAuthor;
  const authorImage = frontMatter.authorImage ?? siteAuthorAvatar;
  const authorLink = frontMatter.authorLink ?? siteAuthorLink;

  const datePublished = new Date(frontMatter.publishedOn).toISOString();

  /**
   * Reference: https://schema.org/Article
   */
  const articleMicrodata = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontMatter.title,
    description: frontMatter.summary,
    image: frontMatter.image,
    datePublished,
    author: SITE_AUTHOR_MICRODATA,
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const readingTime = frontMatter.readingTime!;

  return (
    <>
      {metaImage && (
        <Head>
          <meta property="og:image" content={metaImage} />
          <meta property="twitter:image" content={metaImage} />
        </Head>
      )}
      <Layout
        customMeta={{
          author,
          title: pageTitle,
          description: frontMatter.summary,
          image: frontMatter.image,
          date: datePublished,
          type: 'article',
          keywords: frontMatter.keywords.join(', '),
          canonicalUrl: frontMatter.canonicalUrl,
        }}
      >
        <Script id="article-microdata-script" type="application/ld+json">
          {JSON.stringify(articleMicrodata)}
        </Script>
        <PageHeader title={frontMatter.title} align="center" containerMaxWidth="3xl">
          <VStack spacing={6} mt={6}>
            {frontMatter.imageDetails && (
              <Box rounded="2xl" overflow="hidden">
                <Image
                  src={frontMatter.imageDetails.src}
                  width={frontMatter.imageDetails.width}
                  height={frontMatter.imageDetails.height}
                  alt={frontMatter.title}
                  style={{
                    verticalAlign: 'middle',
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </Box>
            )}
            <BlogPostMeta
              author={author}
              authorImage={authorImage}
              authorLink={authorLink}
              publishedOn={frontMatter.publishedOn}
              readingTime={readingTime}
            />
          </VStack>
        </PageHeader>
        <Box px={4} py={12}>
          <Container maxW="3xl" w="full">
            {mdxSource && <MDXRemote components={mdxComponents} {...mdxSource} />}
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export default BlogPostPage;
