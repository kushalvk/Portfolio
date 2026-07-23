import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main id="main-content" className="mx-auto w-full max-w-2xl px-6 pb-32 pt-24">
      <BlurFade>
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="My thoughts on software development, life, and more."
        />
      </BlurFade>

      <div className="mt-10 flex flex-col gap-2">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={0.1 + id * 0.05} key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group -mx-4 flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium tracking-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                    {post.metadata.title}
                  </p>
                  <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {formatDate(post.metadata.publishedAt)}
                </p>
                {post.metadata.summary && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.metadata.summary}
                  </p>
                )}
              </Link>
            </BlurFade>
          ))}
      </div>
    </main>
  );
}
