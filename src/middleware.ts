import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const html = await response.text();

  let theme = context.request.headers.get('cookie')?.slice(6) || 'no-cookie';
  console.log(theme);

  let modHtml = html.replace(
    `<html lang="en">`,
    `<html lang="en" data-theme="${theme}">`,
  );

  if (context.url.pathname === '/') {
    modHtml = modHtml.replace(
      `<h1>Astro</h1>`,
      `<h1>ASTRO MIDDLEWARE THEMES: This page is server-side rendered</h1>`,
    );
  }

  if (context.url.pathname !== '/') {
    modHtml = modHtml.replace(
      `<h1>Astro</h1>`,
      `<h1>ASTRO MIDDLEWARE THEMES: This page is prerendered</h1>`,
    );
  }

  return new Response(modHtml, {
    status: 200,
    headers: response.headers,
  });
};
