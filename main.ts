import { serve } from './deps.ts';
import { home } from './router.ts';

const handler = async (req: Request): Promise<any> => {
  const pattern: URLPattern = new URLPattern({pathname: '/:id', });
  const pathname = new URL(req.url).pathname;
  if (
    pathname === '/' || pathname === '/argentina' ||
    pathname === '/bolivia' || pathname === '/brasil' ||
    pathname === '/fest'
  ) {
    return home();
  } else {
    const file = await Deno.readFile(`${Deno.cwd()}/public${pathname}`);
    return new Response(file);
  }
};

const env = Deno.env.get('PORT');
const port = env ? Number(env) : 8000;

serve(handler, {port});
