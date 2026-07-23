import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const routes: MetadataRoute.Sitemap = ["", "/blog", "/resume"].map(
    (route) => ({
      url: `${DATA.url}${route}`,
      lastModified: new Date(),
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt
      ? new Date(post.metadata.publishedAt)
      : new Date(),
  }));

  return [...routes, ...blogRoutes];
}
