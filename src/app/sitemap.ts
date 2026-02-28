import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pizza-jet-seven.vercel.app';

  // Отримуємо всі товари
  const products = PRODUCTS;

  // Генеруємо шляхи для української версії з ідентифікаторами товарів
  const productEntriesUk: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/uk/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Генеруємо шляхи для англійської версії
  const productEntriesEn: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/en/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/uk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/uk/menu/pizza`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uk/menu/burger`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uk/menu/drinks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...productEntriesUk,
    ...productEntriesEn,
  ];
}
