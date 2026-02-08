import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { jwt, sign, verify } from 'hono/jwt'

type Bindings = {
  DB: D1Database;
}

// THIS LINE MUST BE HERE - Creates the app
const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// ... all your routes here ...

// THIS MUST BE AT THE VERY END
export default app
