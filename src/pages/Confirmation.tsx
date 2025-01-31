import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import ParticleBackground from "@/components/ParticleBackground"

const Confirmation = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex w-full">
      <ParticleBackground />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-heading font-bold mb-6">Demande envoyée avec succès !</h1>
          <div className="space-y-4 mb-8">
            <p className="text-lg text-muted-foreground">
              Votre demande a été transmise à nos professionnels partenaires.
            </p>
            <p className="text-lg text-muted-foreground">
              Un architecte et un BET vous contacteront sous 48 heures pour discuter de votre projet.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="mx-auto">
            Accéder à mon tableau de bord
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Confirmation