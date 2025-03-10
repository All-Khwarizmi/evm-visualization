import { Github, Linkedin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          About EVM Visualizer
        </h1>

        <div className="space-y-8">
          {/* Project Description */}
          <section className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              EVM Visualizer is an interactive educational tool designed to help
              developers understand the Ethereum Virtual Machine (EVM) through
              visual representation of transactions and smart contract
              execution.
            </p>
            <p className="text-lg text-muted-foreground">
              This project combines my passion for blockchain technology,
              security research, and educational tools to create an intuitive
              way to learn about EVM internals.
            </p>
          </section>

          {/* Creator Info */}
          <section className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold mb-4">About the Creator</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                I&apos;m a self-taught full-stack developer with 2.5 years of
                programming experience, specializing in Web3 and blockchain
                technologies. Currently pursuing the path to become a security
                researcher while exploring AI applications in DeFi.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="https://github.com/All-Khwarizmi" target="_blank">
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/jason-suarez/"
                  target="_blank"
                >
                  <Button variant="outline" size="sm">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>
                <Link href="https://jason-suarez.com" target="_blank">
                  <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-medium mb-2">CryptoNavigator</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered Web3 bot integrating blockchain technology with
                  Mode Network, showcasing smart contract interactions and DeFi
                  protocol interfaces.
                </p>
                <Link
                  href="https://github.com/All-Khwarizmi/crypto-navigator"
                  target="_blank"
                >
                  <Button variant="secondary" size="sm">
                    View Project
                  </Button>
                </Link>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-medium mb-2">LaClasse.app</h3>
                <p className="text-muted-foreground mb-4">
                  Educational platform built with React and TypeScript, focusing
                  on interactive learning experiences.
                </p>
                <Link href="https://www.laclasse.app/" target="_blank">
                  <Button variant="secondary" size="sm">
                    Visit Site
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Blockchain</h3>
                <ul className="text-sm text-muted-foreground">
                  <li>Solidity</li>
                  <li>Smart Contracts</li>
                  <li>ERC20/721</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Web3</h3>
                <ul className="text-sm text-muted-foreground">
                  <li>ethers.js</li>
                  <li>Hardhat</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Frontend</h3>
                <ul className="text-sm text-muted-foreground">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">AI</h3>
                <ul className="text-sm text-muted-foreground">
                  <li>TensorFlow</li>
                  <li>Python</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

