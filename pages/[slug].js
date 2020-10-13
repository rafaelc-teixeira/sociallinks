import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from 'next/router';

const RedirectTo = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("carregou");
    setTimeout(() => {
      console.log("redireciona");
      router.push("/");
    }, 2000);
  });
  return (
    <div>
      <h1>URL não encontrada.</h1>
      <p>Estamos redirecionando você para a central de links.</p>
    </div>
  );
}

export async function getServerSideProps( { params, res } ) {
  const client = Prismic.client('https://rafaelteixeira.cdn.prismic.io/api/v2');
  const link = await client.getByUID('shortlink', params.slug);
  if (link) {
    res.statusCode = 301; // conteudo movido permanentemente
    res.setHeader('Location', link.data.destino.url); // redireciona
    res.end();
    return;
  }
  return { 
    props: {},
  };
}

export default RedirectTo;