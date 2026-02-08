// In src/index.tsx, replace the app.get('/') route with:
app.get('/', async (c) => {
  const html = await Bun.file('./public/landing.html').text()
  return c.html(html)
})
export default app