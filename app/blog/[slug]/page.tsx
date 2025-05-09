import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { BlogPost } from '@/components/blog-post';
import { postAndMoreStoriesQuery, postSlugsQuery } from '@/lib/queries';

export async function generateStaticParams() {
  const slugs = await client.fetch(postSlugsQuery);
  return slugs.map((slug: string) => ({
    slug: slug
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post, morePosts } = await client.fetch(postAndMoreStoriesQuery, {
    slug: params.slug
  });
  
  if (!post) {
    notFound();
  }

  return <BlogPost post={post} relatedPosts={morePosts} />;
}