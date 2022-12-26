
import Head from 'next/head'

import Link from 'next/link';
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";


interface Props {
  posts: [Post];
}

export default function  Home ({ posts }: Props) {
  return(
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>
            is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex md:h-32 md:w-32 lg:h-full lg:w-[300px]"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div>
      {/* Post */}
      <div>
        {posts.map(post =>(
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <div>
              <img src={urlFor(post.mainImage).url()!} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};



export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
 _id,
 title,
 author->{
 name,
 image
 },
 description,
 mainImage,
 slug,
}
  `;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};