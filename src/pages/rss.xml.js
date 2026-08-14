import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('projekte', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'KI-CFO · Projekte',
    description:
      'Arbeitsjournal über KI-Automatisierung in Buchhaltung und Finanzführung für Schweizer KMU. Jedes Projekt dokumentiert: Ausgangslage, Lösung, Resultat.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/projekte/${post.id}`,
    })),
    customData: '<language>de-CH</language>',
  });
}
