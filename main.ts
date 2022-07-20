import { serve } from './deps.ts';
import { home } from './router.ts';

const handler = async (req: Request): Promise<any> => {
  const pattern: URLPattern = new URLPattern({pathname: '/travels/:id', });
  const pathname = new URL(req.url).pathname;
  if (
    pathname === '/' || pathname === '/argentina' ||
    pathname === '/bolivia' || pathname === '/brasil' ||
    pathname === '/fest' || pathname === '/reserve' && pathname
  ) {
    return home();
  } else if (pattern.test(req.url)) {
    return home();
  }
  const file = await Deno.readFile(`${Deno.cwd()}/public${pathname}`);
  return new Response(file);
};

const env = Deno.env.get('PORT');
const port = env ? Number(env) : 8000;

serve(handler, {port});
