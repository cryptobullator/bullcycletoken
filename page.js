export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenue sur mon site Next.js
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">À propos</h2>
          <p>Ceci est un exemple de site créé avec Next.js</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p>Email : exemple@email.com</p>
        </div>
      </div>
    </main>
  )
} 